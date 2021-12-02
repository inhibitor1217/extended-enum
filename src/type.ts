export type Enum = Record<string, string | number>;

export type Keys<E extends Enum> = keyof E;
