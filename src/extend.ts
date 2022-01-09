import {
  find,
  map,
  pipe,
  zip,
} from '@fxts/core';
import match from './match';
import type {
  Enum,
  ExtendedEnum,
  ExtendedEnumMapping,
  ExtendedEnumStatic,
  Keys,
  Primitive,
} from './type';
import {
  cast,
  unsafeCast,
} from './util/cast';
import { toIterable } from './util/iterable';
import {
  fromEntries,
  toEntry,
} from './util/map';

/**
 * @remarks
 *
 * A unique symbol used internally,
 * to verify whether an object is an instance of extended enum.
 */
const KIND = Symbol('ExtendedEnum');

const isInstance = <
  E extends Enum,
  V extends Primitive,
  >(value: any): value is ExtendedEnum<E, V> => (
    // eslint-disable-next-line no-underscore-dangle
    typeof value === 'object' && value.__kind === KIND
  );

interface Instance<
  E extends Enum,
  V extends Primitive,
> {
  key: Keys<E>;
  value: V;
}

/**
 * @remarks
 *
 * The actual constructor of the extended enum instance.
 */
function instance<
  E extends Enum,
  V extends Primitive,
>(
  this: Instance<E, V>,
  key: Keys<E>,
  value: V,
) {
  this.key = key;
  this.value = value;
}

const extend = <
  E extends Enum,
  V extends Primitive,
>(enumObj: E): ExtendedEnumStatic<E, V> => {
  const isStringKey = (key: string) => Number.isNaN(parseInt(key, 10));

  const keys = (): Iterable<Keys<E>> => Object.getOwnPropertyNames(enumObj).filter(isStringKey);

  /**
   * @remarks
   *
   * This should be the only place where unsafe type link between E and V is applied.
   */
  const valueOf = (key: Keys<E>): V => unsafeCast<E[Keys<E>], V>(enumObj[key]);

  const rawValues = (): Iterable<V> => pipe(
    keys(),
    map((key) => valueOf(key)),
    toIterable,
  );

  const instances = new Map<Keys<E>, ExtendedEnum<E, V>>();
  function memoizedInstance<K extends Keys<E>>(
    this: ExtendedEnumStatic<E, V>,
    key: K,
  ): ExtendedEnumMapping<E, V>[K] {
    if (instances.has(key)) { return cast(instances.get(key)!); }

    /**
     * @remarks
     *
     * We are **not** invoking the actual constructor of `this` using `new` keyword,
     * but only setting the **prototype**.
     * This avoids invoking the `FalseConstructor`, which throws an error.
     *
     * `Object.create` does this job.
     */
    const obj = Object.create(this.prototype);
    instance.call(obj, key, valueOf(key));
    instances.set(key, obj);

    return obj;
  }

  function reverseMap(
    this: ExtendedEnumStatic<E, V>,
    value: V,
  ): Keys<E> {
    const found = find((key) => memoizedInstance.call(this, key).is(value), keys());

    if (!found) {
      throw new Error(`invalid value for reverse mapping, got: ${value}`);
    }

    return found;
  }

  function of(
    this: ExtendedEnumStatic<E, V>,
    value: V,
  ): ExtendedEnum<E, V> {
    return memoizedInstance.call(this, reverseMap.call(this, value));
  }

  function keyOf(
    this: ExtendedEnumStatic<E, V>,
    value: V | ExtendedEnum<E, V>,
  ): Keys<E> {
    return reverseMap.call(
      this,
      isInstance<E, V>(value) ? value.valueOf() : value,
    );
  }

  function values(
    this: ExtendedEnumStatic<E, V>,
  ): Iterable<ExtendedEnum<E, V>> {
    return pipe(
      rawValues(),
      map((rawValue) => this.of(rawValue)),
      toIterable,
    );
  }

  function entries(
    this: ExtendedEnumStatic<E, V>,
  ): Iterable<[Keys<E>, ExtendedEnum<E, V>]> {
    return zip(keys(), this.values());
  }

  function from(
    this: ExtendedEnumStatic<E, V>,
    value: string | number | undefined,
    fallback?: V,
  ): ExtendedEnum<E, V> | undefined {
    const wrapFallback = () => {
      if (fallback === undefined) return fallback;
      return this.of(fallback);
    };

    if (value === undefined) return wrapFallback();
    return find((v) => v.is(value), this.values()) ?? wrapFallback();
  }

  function valuesIter(
    this: ExtendedEnumStatic<E, V>,
  ): Iterator<ExtendedEnum<E, V>> {
    return this.values()[Symbol.iterator]();
  }

  const instanceDescriptors = pipe(
    keys(),
    map(toEntry((key) => ({
      get(
        this: ExtendedEnumStatic<E, V>,
      ) { return memoizedInstance.call(this, key); },
    }))),
    fromEntries,
  );

  return Object.defineProperties(
    {
      of,
      from,
      keys,
      values,
      rawValues,
      entries,
      keyOf,
      [Symbol.iterator]: valuesIter,
    },
    instanceDescriptors,
  ) as ExtendedEnumStatic<E, V>;
};

const extendWithFalseConstructor = <
  E extends Enum,
  V extends Primitive,
>(enumObj: E): ExtendedEnumStatic<E, V> => {
  /**
   * @remarks
   *
   * The false constructor.
   *
   * When the inherited class invokes `super()` in its constructor,
   * that will land to this false constructor.
   *
   * This indicates that instances of extended enum cannot be created manually,
   * but it should be accessed by `of` or its key accessors.
   */
  function FalseConstructor(): ExtendedEnum<E, V> {
    throw new Error(`The constructor of ExtendedEnum is not actually implemented.

The definition of constructor exists to fake TypeScript compiler,
so that further extending the class is allowed.

If the constructor is actually invoked, it will throw an error.`);
  }

  Object.defineProperty(FalseConstructor.prototype, '__kind', { get() { return KIND; } });

  FalseConstructor.prototype.eq = function eq(other: V | Primitive): boolean {
    return this.value === other;
  };

  FalseConstructor.prototype.is = function is(other: V | Primitive | ExtendedEnum<E, V>): boolean {
    return isInstance<E, V>(other) ? other.is(this.value) : this.eq(other);
  };

  FalseConstructor.prototype.isNot = function isNot(
    other: V | Primitive | ExtendedEnum<E, V>,
  ): boolean {
    return !this.is(other);
  };

  FalseConstructor.prototype.keyOf = function keyOf(): Keys<E> {
    return this.key;
  };

  FalseConstructor.prototype.valueOf = function valueOf(): V {
    return this.value;
  };

  FalseConstructor.prototype.toString = function toString(): string {
    return this.valueOf().toString();
  };

  FalseConstructor.prototype.toJSON = function toJSON(): Primitive {
    return this.valueOf();
  };

  FalseConstructor.prototype.match = match;

  /**
   * @remarks
   *
   * We are defining static methods here.
   */
  Object.defineProperties(FalseConstructor, Object.getOwnPropertyDescriptors(extend(enumObj)));

  Object.seal(FalseConstructor);
  Object.seal(FalseConstructor.prototype);

  return unsafeCast(FalseConstructor);
};

export default extendWithFalseConstructor;
