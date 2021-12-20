import type {
  Enum,
  ExtendedEnum,
  Keys,
  Primitive,
} from './type';

type PatternObjectKeys<E extends Enum, V extends Primitive> = Keys<E> | V;

export type PatternObject<
  E extends Enum,
  V extends Primitive,
  Result,
> = Partial<Record<PatternObjectKeys<E, V>, Result>>;

type PatternArrayKeys<E extends Enum, V extends Primitive> = Keys<E> | V | ExtendedEnum<E, V>;

export type PatternArray<
  E extends Enum,
  V extends Primitive,
  Result,
> = [PatternArrayKeys<E, V>, Result][];

export type ExtendedEnumPatternMatcher<E extends Enum, V extends Primitive> = {
  <Result>(patterns: PatternObject<E, V, Result>): Result | undefined;
  <Result>(patterns: PatternObject<E, V, Result>, defaultCase: Result): Result;
  <Result>(patterns: PatternArray<E, V, Result>): Result | undefined;
  <Result>(patterns: PatternArray<E, V, Result>, defaultCase: Result): Result;
};
