// NOTE: keep eslint-disable until another util is written
// eslint-disable-next-line import/prefer-default-export
export const toIterable = <T>(iter: Iterator<T>): Iterable<T> => ({
  [Symbol.iterator]: () => iter,
});
