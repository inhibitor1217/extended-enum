import {
  dropWhile,
  isArray,
  isString,
  map,
  pipe,
  some,
} from '@fxts/core';
import type {
  PatternArray,
  PatternArrayKeys,
  PatternObject,
} from './match.type';
import type {
  Enum,
  ExtendedEnum,
  Primitive,
} from './type';
import { entries } from './util/map';

const UNMATCHED = Symbol('UNMATCHED');

type ResolvedPattern<
  E extends Enum,
  V extends Primitive,
  R,
> = [PatternArrayKeys<E, V>[], R];

type Unmatch = typeof UNMATCHED;
type Match<R> = R | Unmatch;

const resolvePatternObject = <
    E extends Enum,
    V extends Primitive,
    R,
  >(
    patternArrayOrObject: PatternArray<E, V, R> | PatternObject<E, V, R>,
  ): PatternArray<E, V, R> => (
    isArray(patternArrayOrObject)
      ? patternArrayOrObject
      : entries(patternArrayOrObject)
  );

const resolvePatternKeyArray = <
    E extends Enum,
    V extends Primitive,
    R,
  >(
    patternArray: PatternArray<E, V, R>,
  ): IterableIterator<ResolvedPattern<E, V, R>> => (
    pipe(
      patternArray,
      map(([keys, value]) => (
        isArray(keys)
          ? [keys, value]
          : [[keys], value]
      ) as ResolvedPattern<E, V, R>),
    )
  );

const matchPattern = <
    E extends Enum,
    V extends Primitive,
  >(
    value: ExtendedEnum<E, V>,
  ) => <R>(
    [patternKeys, result]: ResolvedPattern<E, V, R>,
  ): Match<R> => {
    const matchWithKey = (patternKey: PatternArrayKeys<E, V>) => patternKey === value.keyOf();
    const matchWithValue = (patternKey: PatternArrayKeys<E, V>) => value.is(patternKey);
    const matchWithNumberKey = (patternKey: PatternArrayKeys<E, V>) => (
      isString(patternKey) && value.is(parseInt(patternKey, 10))
    );

    return pipe(
      patternKeys,
      some((patternKey) => (
        matchWithKey(patternKey)
        || matchWithValue(patternKey)
        || matchWithNumberKey(patternKey)
      )),
      (matched) => (matched ? result : UNMATCHED),
    );
  };

const isUnmatch = <R>(result: Match<R>): result is Unmatch => (
  result === UNMATCHED
);

const firstMatch = <T>(matches: IterableIterator<T>): T | Unmatch => {
  const { value, done } = matches.next();
  return done ? UNMATCHED : value;
};

const applyFallback = <D>(defaultCase: D) => <R>(result: Match<R>): R | D => (
  isUnmatch(result)
    ? defaultCase
    : result
);

export default function match<E extends Enum, V extends Primitive, R, D>(
  this: ExtendedEnum<E, V>,
  patterns: PatternArray<E, V, R> | PatternObject<E, V, R>,
  defaultCase?: D,
) {
  return pipe(
    patterns,
    resolvePatternObject,
    resolvePatternKeyArray,
    map(matchPattern(this)),
    dropWhile(isUnmatch),
    firstMatch,
    applyFallback(defaultCase),
  );
}
