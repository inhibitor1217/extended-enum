import {
  drop,
  each,
  pipe,
} from '@fxts/core';
import extend from './extend';

enum Fruit { Apple, Pear, Orange, Strawberry = 'strawberry', Banana = 'banana' }
class EFruit extends extend<typeof Fruit, Fruit>(Fruit) {}

describe('match', () => {
  describe('pattern as object', () => {
    it('matches specified pattern, given as key', () => {
      const pattern = {
        Apple: 'r0',
        Pear: 1,
        Orange: 'orange',
        Strawberry: [1, 2, 3],
      };

      expect(EFruit.Apple.match(pattern)).toBe('r0');
      expect(EFruit.Pear.match(pattern)).toBe(1);
      expect(EFruit.Orange.match(pattern)).toBe('orange');
      expect(EFruit.Strawberry.match(pattern)).toEqual([1, 2, 3]);
    });

    it('matches specified pattern, given as primitive', () => {
      const pattern = {
        [Fruit.Apple]: 'hello',
        [Fruit.Pear]: 'world',
        [Fruit.Strawberry]: ['lorem', 'ipsum', 'dolor'],
      };

      expect(EFruit.Apple.match(pattern)).toBe('hello');
      expect(EFruit.Pear.match(pattern)).toBe('world');
      expect(EFruit.Strawberry.match(pattern)).toEqual(['lorem', 'ipsum', 'dolor']);
    });

    it('returns undefined when no pattern matches the value (1)', () => {
      const pattern = {};

      pipe(
        EFruit.values(),
        each((value) => expect(value.match(pattern)).toBe(undefined)),
      );
    });

    it('returns undefined when no pattern matches the value (2)', () => {
      const pattern = {
        [Fruit.Apple]: 'the only match',
      };

      pipe(
        EFruit.values(),
        drop(1),
        each((value) => expect(value.match(pattern)).toBe(undefined)),
      );
    });

    it('returns default value when no pattern matches the value and default value is given', () => {
      const pattern = {
        [Fruit.Apple]: 'case one',
        Pear: 'case two',
      };

      expect(EFruit.Apple.match(pattern)).toBe('case one');
      expect(EFruit.Pear.match(pattern)).toBe('case two');
      pipe(
        EFruit.values(),
        drop(2),
        each((value) => expect(value.match(pattern, 'default case')).toBe('default case')),
      );
    });

    it('respects the string keys\' order, which is the order of insertion', () => {
      const pattern1 = {
        Strawberry: 'first',
        strawberry: 'second',
        banana: 'third',
        Banana: 'fourth',
      };

      expect(EFruit.Strawberry.match(pattern1)).toBe('first');
      expect(EFruit.Banana.match(pattern1)).toBe('third');

      const pattern2 = {
        strawberry: 'first',
        Banana: 'second',
        banana: 'third',
        Strawberry: 'fourth',
      };

      expect(EFruit.Strawberry.match(pattern2)).toBe('first');
      expect(EFruit.Banana.match(pattern2)).toBe('second');
    });
  });

  describe('pattern as array', () => {
    it('matches specified pattern, given as key', () => {
      const pattern = [
        ['Apple', 1],
        [['Pear', 'Banana'], 2],
        [['Orange', 'Strawberry'], 3],
      ];

      expect(EFruit.Apple.match(pattern)).toBe(1);
      expect(EFruit.Pear.match(pattern)).toBe(2);
      expect(EFruit.Orange.match(pattern)).toBe(3);
      expect(EFruit.Strawberry.match(pattern)).toBe(3);
      expect(EFruit.Banana.match(pattern)).toBe(2);
    });

    it('matches specified pattern, given as primitive', () => {
      const pattern = [
        [[Fruit.Apple, Fruit.Orange], { foo: 'baz' }],
        [[Fruit.Banana, Fruit.Strawberry], { bar: 'baz' }],
      ];

      expect(EFruit.Apple.match(pattern)).toEqual({ foo: 'baz' });
      expect(EFruit.Orange.match(pattern)).toEqual({ foo: 'baz' });
      expect(EFruit.Strawberry.match(pattern)).toEqual({ bar: 'baz' });
      expect(EFruit.Banana.match(pattern)).toEqual({ bar: 'baz' });
    });

    it('matches specified pattern, given as values', () => {
      const pattern = [
        [[EFruit.Apple], 42],
        [EFruit.Pear, 343],
      ];

      expect(EFruit.Apple.match(pattern)).toBe(42);
      expect(EFruit.Pear.match(pattern)).toBe(343);
    });

    it('matches specified pattern, given as mixed', () => {
      const pattern = [
        [[EFruit.Apple, 'Pear', 'strawberry'], 'foo'],
        [Fruit.Orange, 'bar'],
      ];

      expect(EFruit.Apple.match(pattern)).toBe('foo');
      expect(EFruit.Pear.match(pattern)).toBe('foo');
      expect(EFruit.Orange.match(pattern)).toBe('bar');
      expect(EFruit.Strawberry.match(pattern)).toBe('foo');
    });

    it('returns undefined when no pattern matches the value (1)', () => {
      const pattern = [] as unknown[];

      pipe(
        EFruit.values(),
        each((value) => expect(value.match(pattern)).toBe(undefined)),
      );
    });

    it('returns undefined when no pattern matches the value (2)', () => {
      const pattern = [
        [[Fruit.Apple, Fruit.Orange], { foo: 'baz' }],
        [[Fruit.Banana, Fruit.Strawberry], { bar: 'baz' }],
      ];

      expect(EFruit.of(Fruit.Pear).match(pattern)).toBe(undefined);
    });

    it('returns default value when no pattern matches the value and default value is given', () => {
      const pattern = [
        [[Fruit.Apple, Fruit.Orange], { foo: 'baz' }],
        [[Fruit.Banana, Fruit.Strawberry], { bar: 'baz' }],
      ];

      expect(EFruit.of(Fruit.Pear).match(pattern, 'none')).toBe('none');
    });

    it('returns the first matching pattern', () => {
      const pattern1 = [
        [EFruit.Apple, 0],
        ['Apple', 1],
        [0, 2],
      ];

      expect(EFruit.Apple.match(pattern1)).toBe(0);

      const pattern2 = [
        ['Apple', 1],
        [0, 2],
        [EFruit.Apple, 0],
      ];

      expect(EFruit.Apple.match(pattern2)).toBe(1);

      const pattern3 = [
        [0, 2],
        [EFruit.Apple, 0],
        ['Apple', 1],
      ];

      expect(EFruit.Apple.match(pattern3)).toBe(2);
    });
  });
});
