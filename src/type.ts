export type Primitive = string | number;

export type Enum = Record<string, Primitive>;

export type Keys<E extends Enum> = keyof E;

export interface ExtendedEnum<V extends Primitive> {
  is(value: V): boolean;
  is(value: Primitive): boolean;
  is(value: ExtendedEnum<V>): boolean;

  valueOf(): Primitive;

  toString(): string;
  toJSON(): Primitive;
}

export interface ExtendedEnumStatic<E extends Enum, V extends Primitive>
  extends Iterable<ExtendedEnum<V>> {
  of(value: V): ExtendedEnum<V>;

  from(value: string | number | undefined): ExtendedEnum<V> | undefined;
  from(value: string | number | undefined, fallback: V): ExtendedEnum<V>;

  keys(): Iterable<Keys<E>>;
  values(): Iterable<ExtendedEnum<V>>;
  rawValues(): Iterable<V>;
  entries(): Iterable<[Keys<E>, ExtendedEnum<V>]>;
}
