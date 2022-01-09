import type { ExtendedEnumPatternMatcher } from './match.type';

export type Primitive = string | number;

export type Enum = Record<string, Primitive>;

export type Keys<E extends Enum> = string & keyof E;

type ExtendedEnumEqualsMatcher<E extends Enum, V extends Primitive> = {
  (value: V): boolean;
  (value: Primitive): boolean;
  (value: ExtendedEnum<E, V>): boolean;
  (value: V | Primitive | ExtendedEnum<E, V>): boolean;
};

export interface ExtendedEnumIs<E extends Enum, V extends Primitive>
  extends ExtendedEnumEqualsMatcher<E, V> {
  <K extends Keys<E>>(
    this: ExtendedEnum<E, V>,
    value: ExtendedEnumOfKey<E, V, K>,
  ): this is ExtendedEnumOfKey<E, V, K>;
}

export interface ExtendedEnumIsNot<E extends Enum, V extends Primitive>
  extends ExtendedEnumEqualsMatcher<E, V> {
  <K extends Keys<E>>(
    this: ExtendedEnum<E, V>,
    value: ExtendedEnumOfKey<E, V, K>,
  ): this is ExtendedEnumOfKey<E, V, Exclude<Keys<E>, K>>;
}

type BaseExtendedEnum<E extends Enum, V extends Primitive> = {
  /**
   * @deprecated Usage of this attribute is not supported.
   *
   * This is a special attribute which is used to identify
   * whether the object is an instance of extended enum.
   */
  readonly __kind: Symbol;

  /**
   * @deprecated
   *
   * `eq` determines the equality of the given primitive value
   * and the defined value.
   *
   * `eq` governs the comparison performed in the instance:
   * such as in `from`, `is`, or `match`.
   *
   * **Using this method directly is not recommended.**
   * `is` or `isNot` are perhaps the methods you are looking for.
   *
   * In default behavior, this does the reference equality comparison (`===`).
   * Overriding this method will alter the core behavior, granting new possibilities.
   * (See the example.)
   *
   * In the following example, the case-insenstivie comparison overrides the default comparison.
   * Observe how the behavior of `from`, `is`, or `match` differs from the original behavior.
   *
   * @example
   *
   * ```typescript
   * enum Level { Low = 'LOW', High = 'HIGH' }
   * class ELevel extends extend<typeof Level, Level>(Level) {
   *  eq(other: string) {
   *    return this.valueOf().toLowerCase() === other.toLowerCase();
   *  }
   * }
   *
   * ELevel.Low.is('low') // true
   * ELevel.from('high')  // ELevel.High
   * ELevel.Low.match({ low: 0, high: 1 }) // 0
   * ```
   *
   * @param other The primitive value to compare with.
   * @returns Whether given value is "equal" to this instance.
   * This "equality" can be freely defined in advanced usage.
   */
  eq(other: V | Primitive): boolean;

  readonly is: ExtendedEnumIs<E, V>;

  readonly isNot: ExtendedEnumIsNot<E, V>;

  readonly match: ExtendedEnumPatternMatcher<E, V>;

  keyOf(): Keys<E>;
  valueOf(): V;

  toString(): string;
  toJSON(): Primitive;
};

type ExtendedEnumOfKey<E extends Enum, V extends Primitive, K extends Keys<E>> =
  & BaseExtendedEnum<E, V>
  & {
    /**
     * @deprecated Usage of this attribute is not supported.
     *
     * This is a special attribute which is to exclusively define
     * each value of enum by its key.
     */
    readonly __brand: K;

    keyOf(): K;
  };

export type ExtendedEnum<E extends Enum, V extends Primitive> = ExtendedEnumOfKey<E, V, Keys<E>>;

export type ExtendedEnumMapping<E extends Enum, V extends Primitive> = {
  [K in Keys<E>]: ExtendedEnumOfKey<E, V, K>;
};

type ExtendedEnumStaticMethods<E extends Enum, V extends Primitive> = {
  of(
    this: ExtendedEnumStatic<E, V>,
    value: V,
  ): ExtendedEnum<E, V>;

  from(
    this: ExtendedEnumStatic<E, V>,
    value: string | number | undefined,
  ): ExtendedEnum<E, V> | undefined;
  from(
    this: ExtendedEnumStatic<E, V>,
    value: string | number | undefined,
    fallback: V,
  ): ExtendedEnum<E, V>;

  keys(): Iterable<Keys<E>>;

  rawValues(): Iterable<V>;

  values(this: ExtendedEnumStatic<E, V>): Iterable<ExtendedEnum<E, V>>;

  entries(
    this: ExtendedEnumStatic<E, V>,
  ): Iterable<[Keys<E>, ExtendedEnum<E, V>]>;

  keyOf(value: V): Keys<E>;
  keyOf(value: ExtendedEnum<E, V>): Keys<E>;
  keyOf<K extends Keys<E>>(value: ExtendedEnumOfKey<E, V, K>): K;
};

export type ExtendedEnumStatic<E extends Enum, V extends Primitive> =
  & Iterable<ExtendedEnum<E, V>>
  & ExtendedEnumMapping<E, V>
  & ExtendedEnumStaticMethods<E, V>
  & {
    /**
     * @deprecated The constructor is not actually implemented.
     *
     * The definition of constructor exists to fake TypeScript compiler,
     * so that further extending the class is allowed.
     *
     * If the constructor is actually invoked, it will throw an error.
     */
    new (): ExtendedEnum<E, V>
  };
