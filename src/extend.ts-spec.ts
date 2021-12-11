/* eslint-disable max-classes-per-file */

import extend from './extend';
import type { ExtendedEnum } from './type';
import {
  checks,
  extend as extendTypeOf,
  equal,
  Fail,
} from './test/typecheck';

enum FruitP { Apple, Pear, Strawberry }
class Fruit extends extend<typeof FruitP, FruitP>(FruitP) {}

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

declare const fruit: ExtendedEnum<FruitP>;

const keyOfFruit = Fruit.keyOf(fruit);

/* keyOf */
checks(
  equal<typeof keyOfFruit, 'Apple' | 'Pear' | 'Strawberry'>(),
);

const pear = Fruit.Pear;
const strawberry = Fruit.Strawberry;

enum VegetableP { Potato, Celery }
class Vegetable extends extend<typeof VegetableP, VegetableP>(VegetableP) {}

/* typed instances */
checks(
  extendTypeOf<typeof apple, Fruit>(),
  extendTypeOf<typeof pear, Fruit>(),
  extendTypeOf<typeof strawberry, Fruit>(),

  extendTypeOf<typeof apple, Vegetable, Fail>(),
);
