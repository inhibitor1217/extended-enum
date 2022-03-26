import {
  filter,
  map,
  pipe,
  toArray,
} from '@fxts/core';
import extend from './extend';
import {
  checks,
  equal,
  extend as extendTypeOf,
} from './test/typecheck';

enum Fruit { Apple, Orange, Strawberry }

interface IFruit {
  readonly name: string
  likes(): boolean
}

class EFruit extends extend<typeof Fruit, Fruit, IFruit>(Fruit) {
  get name(): string {
    return ['Fruit', this.toString()].join(':');
  }

  likes(): boolean {
    return this.is(EFruit.Apple);
  }
}

declare const fruit: EFruit;

checks(
  extendTypeOf<Fruit.Apple, Fruit>(),
  extendTypeOf<typeof EFruit.Orange, EFruit>(),
);

(function definedPropertyIsVisible(f: EFruit) {
  type T1 = typeof f.name;
  type T2 = typeof EFruit.Apple.name;

  const orange = EFruit.of(Fruit.Orange);
  type T3 = typeof orange.name;

  const parsed = EFruit.from('foo', Fruit.Apple);
  type T4 = typeof parsed.name;

  const names = pipe(EFruit.values(), map((_) => _.name), toArray);
  type T5 = typeof names;

  checks(
    equal<T1, string>(),
    equal<T2, string>(),
    equal<T3, string>(),
    equal<T4, string>(),
    equal<T5, string[]>(),
  );
}(fruit));

(function definedMethodIsVisible(f: EFruit) {
  type T1 = typeof f.likes;
  type T2 = typeof EFruit.Apple.likes;

  const orange = EFruit.of(Fruit.Orange);
  type T3 = typeof orange.likes;

  const parsed = EFruit.from('foo', Fruit.Apple);
  type T4 = typeof parsed.likes;

  const liked = pipe(EFruit.values(), filter((_) => _.likes()), toArray);
  type T5 = typeof liked;

  type LikedFn = () => boolean;

  checks(
    equal<T1, LikedFn>(),
    equal<T2, LikedFn>(),
    equal<T3, LikedFn>(),
    equal<T4, LikedFn>(),
    extendTypeOf<T5, EFruit[]>(),
  );
}(fruit));
