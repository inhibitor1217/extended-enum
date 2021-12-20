export type Primitive = string | number;

export type Enum = Record<string, Primitive>;

export type Keys<E extends Enum> = string & keyof E;

type ExtendedEnumEqualsMatcher<E extends Enum, V extends Primitive> = {
  (value: V): boolean;
  (value: Primitive): boolean;
  (value: ExtendedEnum<E, V>): boolean;
};

export interface ExtendedEnumIs<E extends Enum, V extends Primitive>
  extends ExtendedEnumEqualsMatcher<E, V> {
  <K extends Keys<E>>(
    this: ExtendedEnum<E, V>,
    value: ExtendedEnumOfKey<E, V, K>,
  ): this is ExtendedEnumOfKey<E, V, K>;

  readonly not: ExtendedEnumEqualsMatcher<E, V>;
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

  readonly is: ExtendedEnumIs<E, V>;

  readonly isNot: ExtendedEnumIsNot<E, V>;

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
  };

export type ExtendedEnum<E extends Enum, V extends Primitive> = ExtendedEnumOfKey<E, V, Keys<E>>;

export type ExtendedEnumMapping<E extends Enum, V extends Primitive> = {
  [K in Keys<E>]: ExtendedEnumOfKey<E, V, K>;
};

type ExtendedEnumStaticMethods<E extends Enum, V extends Primitive> = {
  of(value: V): ExtendedEnum<E, V>;

  from(value: string | number | undefined): ExtendedEnum<E, V> | undefined;
  from(value: string | number | undefined, fallback: V): ExtendedEnum<E, V>;

  keys(): Iterable<Keys<E>>;
  values(): Iterable<ExtendedEnum<E, V>>;
  rawValues(): Iterable<V>;
  entries(): Iterable<[Keys<E>, ExtendedEnum<E, V>]>;

  keyOf(value: V): Keys<E>;
  keyOf(value: ExtendedEnum<E, V>): Keys<E>;
  keyOf<K extends Keys<E>>(value: ExtendedEnumOfKey<E, V, K>): K;
};

export type ExtendedEnumStatic<E extends Enum, V extends Primitive> =
  & Iterable<ExtendedEnum<E, V>>
  & ExtendedEnumMapping<E, V>
  & ExtendedEnumStaticMethods<E, V>;

export type ExtendedEnumConstructor<E extends Enum, V extends Primitive> = {
  /**
   * @deprecated The constructor is not actually implemented.
   *
   * The definition of constructor exists to fake TypeScript compiler,
   * so that further extending the class is allowed.
   *
   * If the constructor is actually invoked, it will throw an error.
   */
  new (): ExtendedEnum<E, V>;
};
