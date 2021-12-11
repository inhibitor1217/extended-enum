import {
  map,
  pipe,
} from '@fxts/core';
import { cast } from './cast';

export const toEntry = <K, V>(toValue: (key: K) => V) => (key: K): [K, V] => [key, toValue(key)];

export const entries = <
  K extends string,
  V,
>(obj: Record<K, V>): [K, V][] => cast(Object.entries(obj));

export const fromEntries = <
  K extends string,
  V,
>(iter: Iterable<[K, V]>): Record<K, V> => cast(Object.fromEntries(iter));

export const mapKeys = <
  K extends string,
  R extends string,
>(f: (key: K) => R) => <IK extends K, V>(obj: Record<IK, V>): Record<R, V> => pipe(
    entries(obj),
    map(([k, v]) => [f(k), v] as [R, V]),
    fromEntries,
  );
