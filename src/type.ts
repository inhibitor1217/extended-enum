export type Primitive = string | number;

export type Enum = Record<string, Primitive>;

export type Keys<E extends Enum> = string & keyof E;

type ExtendedEnumEqualsMatcher<V extends Primitive> = {
  (value: V): boolean;
  (value: Primitive): boolean;
  (value: ExtendedEnum<V>): boolean;
};

type ExtendedEnumIs<V extends Primitive> = ExtendedEnumEqualsMatcher<V> & {
  readonly not: ExtendedEnumEqualsMatcher<V>;
};

export type ExtendedEnum<V extends Primitive> = {
  /**
   * @deprecated Usage of this attribute is not supported.
   *
   * This is a special attribute which is used to identify
   * whether the object is an instance of extended enum.
   */
  readonly __kind: Symbol;

  readonly is: ExtendedEnumIs<V>;

  valueOf(): Primitive;

  toString(): string;
  toJSON(): Primitive;
};

export type ExtendedEnumOfKey<E extends Enum, V extends Primitive, K extends Keys<E>> =
  & ExtendedEnum<V>
  & {
    /**
     * @deprecated Usage of this attribute is not supported.
     *
     * This is a special attribute which is to exclusively define
     * each value of enum by its key.
     */
    readonly __brand: K;
  };

type ExtendedEnumMapping<E extends Enum, V extends Primitive> = Record<Keys<E>, ExtendedEnum<V>>;

type ExtendedEnumStaticMethods<E extends Enum, V extends Primitive> = {
  of(value: V): ExtendedEnum<V>;

  from(value: string | number | undefined): ExtendedEnum<V> | undefined;
  from(value: string | number | undefined, fallback: V): ExtendedEnum<V>;

  keys(): Iterable<Keys<E>>;
  values(): Iterable<ExtendedEnum<V>>;
  rawValues(): Iterable<V>;
  entries(): Iterable<[Keys<E>, ExtendedEnum<V>]>;
};

export type ExtendedEnumStatic<E extends Enum, V extends Primitive> =
  & Iterable<ExtendedEnum<V>>
  & ExtendedEnumMapping<E, V>
  & ExtendedEnumStaticMethods<E, V>;
