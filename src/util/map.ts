// NOTE: keep eslint-disable until another util is written
// eslint-disable-next-line import/prefer-default-export
export const toEntry = <K, V>(toValue: (key: K) => V) => (key: K): [K, V] => [key, toValue(key)];
