import {
  extend,
  equal,
  checks,
  Fail,
} from './typecheck';

const a: number = 1;
const b = 1;

checks(
  equal<number, number>(),
  equal<typeof a, number>(),
  equal<typeof b, number, Fail>(),

  extend<typeof b, number>(),
);

const partial = { foo: 'foo' };

type Full = {
  foo: string;
  bar: string;
};

checks(
  extend<typeof partial, Full, Fail>(),
  extend<typeof partial, Partial<Full>>(),
);
