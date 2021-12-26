import type {
  PatternArray,
  PatternObject,
} from './match.type';
import type {
  Enum,
  ExtendedEnum,
  Primitive,
} from './type';

export default function match<
  E extends Enum,
  V extends Primitive,
  Result,
  DefaultCase,
>(
  this: ExtendedEnum<E, V>,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  patterns: PatternArray<E, V, Result> | PatternObject<E, V, Result>,
  defaultCase?: DefaultCase,
  /* eslint-enable @typescript-eslint/no-unused-vars */
): Result | DefaultCase {
  throw new Error('not implemented');
}
