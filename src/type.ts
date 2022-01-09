import type { ExtendedEnumPatternMatcher } from './match.type';

export type Primitive = string | number;

export type Enum = Record<string, Primitive>;

export type Keys<E extends Enum> = string & keyof E;

interface BaseExtendedEnum<E extends Enum, V extends Primitive> {
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

  /**
   * Compares with the given value, then determines the equality.
   *
   * The behavior of `is` depends on `eq`.
   *
   * @see eq
   */
  is(value: V): boolean;
  is(value: Primitive): boolean;
  is<K extends Keys<E>>(value: ExtendedEnumOfKey<E, V, K>): this is ExtendedEnumOfKey<E, V, K>;
  is(value: ExtendedEnum<E, V>): boolean;
  is(value: V | Primitive | ExtendedEnum<E, V>): boolean;

  /**
   * Compares with the given value, then determines the equality.
   *
   * The behavior of `isNot` depends on `eq`.
   *
   * @see eq
   */
  isNot(value: V): boolean;
  isNot(value: Primitive): boolean;
  isNot<K extends Keys<E>>(value: ExtendedEnumOfKey<E, V, K>):
    this is ExtendedEnumOfKey<E, V, Exclude<Keys<E>, K>>;
  isNot(value: ExtendedEnum<E, V>): boolean;
  isNot(value: V | Primitive | ExtendedEnum<E, V>): boolean;

  /**
   * Used for pattern matching.
   *
   * Define a pattern mapping from keys, values, or instances
   * to designated value.
   *
   * The collection of patterns can be supplied
   * in a form of either an array or an object.
   *
   * @example
   * ```typescript
   * enum Level { Low = 'low', Medium = 'medium', High = 'high' }
   * class ELevel extends extend<typeof Level, Level>(Level) {}
   *
   * declare const level: ELevel;
   *
   * level.match({ Low: 0, High: 10 });
   * level.match({ Low: 0 }, -1); // specifying a fallback value
   *
   * level.match({ low: 0, high: 10 }); // pattern with defined primitives
   *
   * level.match([
   *   ['Low', 0],
   *   ['High', 10],
   * ]);
   *
   * level.match([
   *   [[ELevel.Low, ELevel.Medium], 0], // match multiple pattern to single value
   *   [ELevel.High, 10],
   * ]);
   * ```
   */
  readonly match: ExtendedEnumPatternMatcher<E, V>;

  /**
   * Returns the key.
   */
  keyOf(): Keys<E>;

  /**
   * Returns the primitive.
   */
  valueOf(): V;

  toString(): string;
  toJSON(): Primitive;
}

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
  /**
   * `of` returns an instance of extended enumeration with given primitive.
   *
   * It returns the same reference if you supplied the same value.
   *
   * If `value` is not a defined value, it will throw an error.
   *
   * @see from If you are looking for how to parse the value, `from` is the adequate choice.
   *
   * @example
   * ```typescript
   * enum Level { Low = 'low', High = 'high' }
   * class ELevel extends extend<typeof Level, Level>(Level) {}
   *
   * const level = ELevel.of(Level.High);
   *
   * ELevel.of('medium'); // type error, also a runtime error
   * ```
   */
  of(
    this: ExtendedEnumStatic<E, V>,
    value: V,
  ): ExtendedEnum<E, V>;

  /**
   * `from` returns an instance of extended enumeration with given value.
   *
   * It differs from `of` since **`from` allows `value` to be any value.**
   * If given `value` was not among the defined ones, it will return `undefined`,
   * or return the given `fallback`.
   *
   * Typical usage of `from` will be parsing a primitive value to an enum.
   *
   * @example
   * ```typescript
   * enum Level { Low = 'low', High = 'high' }
   * class ELevel extends extend<typeof Level, Level>(Level) {}
   *
   * const l0 = ELevel.from('high'); // ELevel.High
   * const l1 = ELevel.from('medium'); // 'medium' is not a defined value, so it will be undefined
   * const l2 = ELevel.from('medium', Level.Low); // fallback to ELevel.Low
   * ```
   */
  from(
    this: ExtendedEnumStatic<E, V>,
    value: string | number | undefined,
  ): ExtendedEnum<E, V> | undefined;
  from(
    this: ExtendedEnumStatic<E, V>,
    value: string | number | undefined,
    fallback: V,
  ): ExtendedEnum<E, V>;

  /**
   * Returns an iterable of defined keys.
   * The keys will be iterated by its definition order.
   *
   * @example
   * ```typescript
   * enum Fruit { Apple, Orange, Strawberry }
   * class EFruit extends extend<typeof Fruit, Fruit>(Fruit) {}
   *
   * for (const key of EFruit.keys()) {
   *   console.log(key); // logs 'Apple', 'Orange', 'Strawberry'
   * }
   * ```
   *
   * @see values
   * @see rawValues
   * @see entries
   */
  keys(): Iterable<Keys<E>>;

  /**
   * Returns an iterable of defined values (primitives).
   * The values will be iterated by its definition order.
   *
   * @example
   * ```typescript
   * enum Fruit { Apple, Orange, Strawberry }
   * class EFruit extends extend<typeof Fruit, Fruit>(Fruit) {}
   *
   * for (const value of EFruit.rawValues()) {
   *   console.log(value); // logs 0, 1, 2
   * }
   * ```
   *
   * @see keys
   * @see values
   * @see entries
   */
  rawValues(): Iterable<V>;

  /**
   * Returns an iterable of extended enumeration instances.
   * The values will be iterated by its definition order of respective keys.
   *
   * @example
   * ```typescript
   * enum Fruit { Apple, Orange, Strawberry }
   * class EFruit extends extend<typeof Fruit, Fruit>(Fruit) {}
   *
   * for (const value of EFruit.values()) {
   *   console.log(value); // logs EFruit.Apple, EFruit.Orange, EFruit.Strawberry
   * }
   * ```
   *
   * @see keys
   * @see rawValues
   * @see entries
   */
  values(this: ExtendedEnumStatic<E, V>): Iterable<ExtendedEnum<E, V>>;

  /**
   * Returns an iterable of tuple `[key, instance]`.
   * This tuple will be iterated by its definition order of respective keys.
   *
   * @example
   * ```typescript
   * enum Fruit { Apple, Orange, Strawberry }
   * class EFruit extends extend<typeof Fruit, Fruit>(Fruit) {}
   *
   * for (const [key, value] of EFruit.entries()) {
   *   console.log(key); // logs 'Apple', 'Orange', 'Strawberry'
   *   console.log(value); // logs EFruit.Apple, EFruit.Orange, EFruit.Strawberry
   * }
   * ```
   *
   * @see keys
   * @see rawValues
   * @see values
   */
  entries(
    this: ExtendedEnumStatic<E, V>,
  ): Iterable<[Keys<E>, ExtendedEnum<E, V>]>;

  /**
   * `keyOf` corresponds to the reverse mapping feature
   * of TypeScript native enum.
   *
   * Native enums can be reverse mapped from value to key, such as:
   * ```typescript
   * enum Level { Low = 'low', High = 'high' }
   *
   * Level[Level.Low] // 'Low'
   * Level[Level.High] // 'High'
   * ```
   *
   * `keyOf` provides the similar interface with above.
   *
   * ```typescript
   * enum Level { Low = 'low', High = 'high' }
   * class ELevel extends extend<typeof Level, Level>(Level) {}
   *
   * ELevel.keyOf(Level.Low) // 'Low'
   * ELevel.keyOf(Level.High) // 'High'
   *
   * // Also, reverse mapping from instance to key is possible.
   * ELevel.keyOf(ELevel.Low) // 'Low'
   * ELevel.keyOf(ELevel.High) // 'High'
   * ```
   */
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
