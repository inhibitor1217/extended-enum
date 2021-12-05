import extend from './extend';
import {
  checks,
  extend as extendTypeOf,
  equal,
} from './test/typecheck';

enum FruitP { Apple, Pear, Strawberry }
const Fruit = extend<typeof FruitP, FruitP>(FruitP);

const apple = Fruit.of(FruitP.Apple);

/* is */
checks(
  extendTypeOf<typeof apple.is, Function>(),
  equal<ReturnType<typeof apple.is>, boolean>(),
);

/* is.not */
checks(
  extendTypeOf<typeof apple.is.not, Function>(),
  equal<ReturnType<typeof apple.is.not>, boolean>(),
);
