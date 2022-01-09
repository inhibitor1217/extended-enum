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

declare const fruit: ExtendedEnum<typeof FruitP, FruitP>;

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

/* typed instances should be exclusive */
checks(
  extendTypeOf<typeof apple & typeof apple, typeof apple>(),
  extendTypeOf<typeof pear & typeof strawberry, never>(),
);

/*
 * TODO: should implement exhaustive typing of instance types
 *
 * remove @ts-ignore directive of following test case
 * after implementing the feature
 */
(function exhaustive(f: Fruit) {
  if (f === Fruit.Apple && f === Fruit.Pear) {
    type T1 = typeof f;
    // @ts-ignore
    checks(equal<T1, never>());
  }

  switch (f) {
    case Fruit.Apple:
      return 'foo';
    case Fruit.Pear:
      return 'bar';
    case Fruit.Strawberry:
      return 'baz';
    default:
      type T2 = typeof f;
      // @ts-ignore
      checks(equal<T2, never>());
      return null;
  }
}(pear));

(function isTypeGuard(f: Fruit) {
  if (f.is(Fruit.Strawberry)) {
    type T1 = typeof f;
    checks(equal<T1, typeof Fruit.Strawberry>());
  }

  if (f.is(Fruit.Apple) && f.is(Fruit.Pear)) {
    type T2 = typeof f;
    checks(extendTypeOf<T2, never>());
  }

  if (f.isNot(Fruit.Strawberry)) {
    type T3 = typeof f;
    checks(
      extendTypeOf<typeof Fruit.Apple, T3>(),
      extendTypeOf<typeof Fruit.Pear, T3>(),
      extendTypeOf<typeof Fruit.Strawberry, T3, Fail>(),
    );
  }

  if (f.is(Fruit.Apple) && f.isNot(Fruit.Apple)) {
    type T4 = typeof f;
    checks(extendTypeOf<T4, never>());
  }
}(pear));
