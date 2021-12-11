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

  valueOf(): V;

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

  keyOf(value: V): Keys<E>;
  keyOf(value: ExtendedEnum<V>): Keys<E>;
  keyOf<K extends Keys<E>>(value: ExtendedEnumOfKey<E, V, K>): K;
};

export type ExtendedEnumStatic<E extends Enum, V extends Primitive> =
  & Iterable<ExtendedEnum<V>>
  & ExtendedEnumMapping<E, V>
  & ExtendedEnumStaticMethods<E, V>;

export type ExtendedEnumConstructor<V extends Primitive> = {
  /**
   * @deprecated The constructor is not actually implemented.
   *
   * The definition of constructor exists to fake TypeScript compiler,
   * so that further extending the class is allowed.
   *
   * If the constructor is actually invoked, it will throw an error.
   */
  new (): ExtendedEnum<V>;
};
