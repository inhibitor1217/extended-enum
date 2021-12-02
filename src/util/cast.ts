export const cast = <T, R extends T>(value: T): R => value as R;

export const unsafeCast = <T, R>(value: T): R => value as unknown as R;
