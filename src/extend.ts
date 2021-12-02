import {
  find,
  map,
  pipe,
  zip,
} from '@fxts/core';
import type {
  Enum,
  ExtendedEnum,
  ExtendedEnumStatic,
  Keys,
  Primitive,
} from './type';
import { unsafeCast } from './util/cast';
import { toIterable } from './util/iterable';

const isStringKey = (key: string) => Number.isNaN(parseInt(key, 10));

const extend = <
  E extends Enum,
  V extends Primitive,
>(enumObj: E): ExtendedEnumStatic<E, V> => class EnumClazz implements ExtendedEnum<V> {
    private static readonly instances: Map<V, ExtendedEnum<V>> = new Map();

    private readonly value: V;

    private constructor(value: V) {
      this.value = value;
      Object.freeze(this);
    }

    static of(value: V): ExtendedEnum<V> {
      const memoized = this.instances.get(value);

      if (memoized) return memoized;

      const created = new this(value);
      this.instances.set(value, created);
      return created;
    }

    static from(value: string | number | undefined): ExtendedEnum<V> | undefined;
    static from(value: string | number | undefined, fallback: V): ExtendedEnum<V>;
    static from(value: string | number | undefined, fallback?: V): ExtendedEnum<V> | undefined {
      const wrapFallback = () => {
        if (fallback === undefined) return fallback;
        return this.of(fallback);
      };

      if (value === undefined) return wrapFallback();
      return find((v) => v.is(value), this.values()) ?? wrapFallback();
    }

    static keys(): Iterable<Keys<E>> {
      return Object.getOwnPropertyNames(enumObj)
        .filter(isStringKey);
    }

    static values(): Iterable<ExtendedEnum<V>> {
      return pipe(
        this.rawValues(),
        map(this.of.bind(this)),
        toIterable,
      );
    }

    private static valueOf(key: Keys<E>): V {
      // NOTE: this should be the only place where unsafe type link between E and V is applied
      return unsafeCast<E[Keys<E>], V>(enumObj[key]);
    }

    static rawValues(): Iterable<V> {
      return pipe(
        this.keys(),
        map(this.valueOf.bind(this)),
        toIterable,
      );
    }

    static entries(): Iterable<[Keys<E>, ExtendedEnum<V>]> {
      return zip(this.keys(), this.values());
    }

    static [Symbol.iterator](): Iterator<ExtendedEnum<V>> {
      return this.values()[Symbol.iterator]();
    }

    is(other: V): boolean;
    is(other: Primitive): boolean;
    is(other: ExtendedEnum<V>): boolean;
    is(other: V | Primitive | ExtendedEnum<V>): boolean {
      if (other instanceof EnumClazz) {
        return (other as ExtendedEnum<V>).is(this.value);
      }

      return this.value === other;
    }

    valueOf(): Primitive {
      return this.value;
    }

    toString(): string {
      return this.valueOf().toString();
    }

    toJSON(): Primitive {
      return this.valueOf();
    }
  };

export default extend;
