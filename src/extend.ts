import {
  find,
  map,
  pipe,
  zip,
} from '@fxts/core';
import type {
  Enum,
  ExtendedEnum,
  ExtendedEnumConstructor,
  ExtendedEnumOfKey,
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

const KIND = Symbol('ExtendedEnum');

const isInstance = <
  V extends Primitive,
  // eslint-disable-next-line no-underscore-dangle
>(value: any): value is ExtendedEnum<V> => value.__kind === KIND;

const instance = <V extends Primitive>(value: V): ExtendedEnum<V> => {
  const eq = (other: V | Primitive | ExtendedEnum<V>): boolean => (
    isInstance<V>(other) ? other.is(value) : other === value
  );

  const neq = (other: V | Primitive | ExtendedEnum<V>): boolean => !eq(other);

  const is = Object.assign(eq, { not: neq });

  const valueOf = (): V => value;

  const toString = (): string => valueOf().toString();

  const toJSON = valueOf;

  return {
    __kind: KIND,
    is,
    valueOf,
    toString,
    toJSON,
  };
};

/**
 * `instanceOf` behaves the same with `instance`,
 * but it returns a branded type of `ExtendedEnum<V>` with specified key `K`.
 */
const instanceOf = <
  E extends Enum,
  V extends Primitive,
  K extends Keys<E>,
>(value: V): ExtendedEnumOfKey<E, V, K> => cast(instance(value));

const extend = <
  E extends Enum,
  V extends Primitive,
>(enumObj: E): ExtendedEnumStatic<E, V> => {
  const isStringKey = (key: string) => Number.isNaN(parseInt(key, 10));

  const keys = (): Iterable<Keys<E>> => Object.getOwnPropertyNames(enumObj).filter(isStringKey);

  // NOTE: this should be the only place where unsafe type link between E and V is applied
  const valueOf = (key: Keys<E>): V => unsafeCast<E[Keys<E>], V>(enumObj[key]);

  const rawValues = (): Iterable<V> => pipe(
    keys(),
    map(valueOf),
    toIterable,
  );

  const instances = pipe(
    keys(),
    map(toEntry(<K extends Keys<E>>(key: K) => instanceOf<E, V, K>(valueOf(key)))),
    fromEntries,
  );

  const reverseMap = (value: V): Keys<E> => {
    const found = find((key) => instances[key].is(value), keys());

    if (!found) {
      throw new Error(`invalid value for reverse mapping, got: ${value}`);
    }

    return found;
  };

  const keyOf = (value: V | ExtendedEnum<V>): Keys<E> => reverseMap(
    isInstance<V>(value) ? value.valueOf() : value,
  );

  const of = (value: V): ExtendedEnum<V> => instances[reverseMap(value)];

  const values = (): Iterable<ExtendedEnum<V>> => pipe(
    rawValues(),
    map(of),
    toIterable,
  );

  const entries = (): Iterable<[Keys<E>, ExtendedEnum<V>]> => zip(keys(), values());

  const from = (
    (value: string | number | undefined, fallback?: V): ExtendedEnum<V> | undefined => {
      const wrapFallback = () => {
        if (fallback === undefined) return fallback;
        return of(fallback);
      };

      if (value === undefined) return wrapFallback();
      return find((v) => v.is(value), values()) ?? wrapFallback();
    }
  ) as ExtendedEnumStatic<E, V>['from'];

  return {
    ...instances,

    of,
    from,
    keys,
    values,
    rawValues,
    entries,
    keyOf,
    [Symbol.iterator]: values()[Symbol.iterator],
  };
};

const extendWithFalseConstructor = <
  E extends Enum,
  V extends Primitive,
>(enumObj: E): ExtendedEnumStatic<E, V> & ExtendedEnumConstructor<V> => {
  function FalseConstructor(): ExtendedEnum<V> {
    throw new Error(`The constructor of ExtendedEnum is not actually implemented.

The definition of constructor exists to fake TypeScript compiler,
so that further extending the class is allowed.

If the constructor is actually invoked, it will throw an error.`);
  }

  return unsafeCast(Object.assign(FalseConstructor, extend(enumObj)));
};

export default extendWithFalseConstructor;
