/* eslint-disable max-classes-per-file */

import extend from './extend';
import type { ExtendedEnum } from './type';
import {
  checks,
  extend as extendTypeOf,
  equal,
  Fail,
} from './test/typecheck';

enum Fruit { Apple, Pear, Strawberry }
class EFruit extends extend<typeof Fruit, Fruit>(Fruit) {}

const apple = EFruit.of(Fruit.Apple);

/* is */
checks(
  extendTypeOf<typeof apple.is, Function>(),
  equal<ReturnType<typeof apple.is>, boolean>(),
);

declare const fruit: ExtendedEnum<typeof Fruit, Fruit>;

const keyOfFruit = EFruit.keyOf(fruit);

/* keyOf */
checks(
  equal<typeof keyOfFruit, 'Apple' | 'Pear' | 'Strawberry'>(),
);

const pear = EFruit.Pear;
const strawberry = EFruit.Strawberry;

enum Vegetable { Potato, Celery }
class EVegetable extends extend<typeof Vegetable, Vegetable>(Vegetable) {}

/* typed instances */
checks(
  extendTypeOf<typeof apple, EFruit>(),
  extendTypeOf<typeof pear, EFruit>(),
  extendTypeOf<typeof strawberry, EFruit>(),

  extendTypeOf<typeof apple, EVegetable, Fail>(),
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
(function exhaustive(f: EFruit) {
  if (f === EFruit.Apple && f === EFruit.Pear) {
    type T1 = typeof f;
    // @ts-ignore
    checks(equal<T1, never>());
  }

  switch (f) {
    case EFruit.Apple:
      return 'foo';
    case EFruit.Pear:
      return 'bar';
    case EFruit.Strawberry:
      return 'baz';
    default:
      type T2 = typeof f;
      // @ts-ignore
      checks(equal<T2, never>());
      return null;
  }
}(pear));

(function isTypeGuard(f: EFruit) {
  if (f.is(EFruit.Strawberry)) {
    type T1 = typeof f;
    checks(equal<T1, typeof EFruit.Strawberry>());
  }

  if (f.is(EFruit.Apple) && f.is(EFruit.Pear)) {
    type T2 = typeof f;
    checks(extendTypeOf<T2, never>());
  }

  if (f.isNot(EFruit.Strawberry)) {
    type T3 = typeof f;
    checks(
      extendTypeOf<typeof EFruit.Apple, T3>(),
      extendTypeOf<typeof EFruit.Pear, T3>(),
      extendTypeOf<typeof EFruit.Strawberry, T3, Fail>(),
    );
  }

  if (f.is(EFruit.Apple) && f.isNot(EFruit.Apple)) {
    type T4 = typeof f;
    checks(extendTypeOf<T4, never>());
  }
}(pear));
