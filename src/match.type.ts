import type {
  Enum,
  ExtendedEnum,
  Keys,
  Primitive,
} from './type';

type PatternObjectKeys<E extends Enum, V extends Primitive> =
  | Keys<E>
  | V
  | Primitive;

export type PatternObject<
  E extends Enum,
  V extends Primitive,
  Result,
> = {
  [key in PatternObjectKeys<E, V>]: Result;
};

type PatternArrayKeys<E extends Enum, V extends Primitive> =
  | Keys<E>
  | V
  | Primitive
  | ExtendedEnum<E, V>;

export type PatternArray<
  E extends Enum,
  V extends Primitive,
  Result,
> = [PatternArrayKeys<E, V>, Result][];

export type ExtendedEnumPatternMatcher<E extends Enum, V extends Primitive> = {
  <Result>(patterns: PatternObject<E, V, Result>): Result | undefined;
  <Result>(patterns: PatternArray<E, V, Result>): Result | undefined;

  <Result, DefaultCase = Result>(
    patterns: PatternObject<E, V, Result>,
    defaultCase: DefaultCase,
  ): Result | DefaultCase;

  <Result, DefaultCase = Result>(
    patterns: PatternArray<E, V, Result>,
    defaultCase: DefaultCase,
  ): Result | DefaultCase;
};
