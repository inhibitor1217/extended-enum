/* eslint-disable max-classes-per-file */

import {
  pipe,
  toArray,
} from '@fxts/core';
import extend from './extend';

describe('define methods', () => {
  it('should work with number enumerations', () => {
    enum Fruit { Apple, Orange }

    interface IFruit {
      readonly price: number;
      likes(): boolean;
    }

    class EFruit extends extend<typeof Fruit, Fruit, IFruit>(Fruit) {
      get price(): number {
        return this.match({
          [Fruit.Apple]: 1,
          [Fruit.Orange]: 1.5,
        }, 0);
      }

      likes(): boolean {
        return this.is(Fruit.Apple);
      }

      static get displayName(): string {
        return 'Fruit';
      }
    }

    expect(EFruit.displayName).toBe('Fruit');
    expect(EFruit.Apple.price).toBe(1);
    expect(EFruit.Orange.price).toBe(1.5);
    expect(EFruit.Apple.likes()).toBe(true);
    expect(EFruit.Orange.likes()).toBe(false);
  });

  it('should work with mixed enumerations', () => {
    enum Animal {
      Cat,
      Dog = 'dog',
      Elephant = 'elephant',
    }

    interface IAnimal {
      barks(): boolean
      serialize(): string
    }

    class EAnimal extends extend<typeof Animal, Animal, IAnimal>(Animal) {
      barks(): boolean {
        return this.is(Animal.Dog);
      }

      serialize(): string {
        return ['Animal', this.toString()].join(':');
      }
    }

    expect(EAnimal.Cat.barks()).toBe(false);
    expect(EAnimal.Dog.barks()).toBe(true);
    expect(EAnimal.Cat.serialize()).toBe('Animal:0');
    expect(EAnimal.Elephant.serialize()).toBe('Animal:elephant');
  });
});

describe('extend', () => {
  it('should be working with instanceof operator', () => {
    enum Fruit { Apple, Orange }
    const EFruitBase = extend<typeof Fruit, Fruit>(Fruit);
    class EFruit extends EFruitBase {
      get name() { return this.keyOf(); }
    }

    enum Animal { Cat, Dog }

    class EAnimal extends extend<typeof Animal, Animal>(Animal) {
      barks(): boolean {
        return this.is(Animal.Dog);
      }
    }

    expect(EFruit.Apple instanceof EFruit).toBe(true);
    expect(Object.prototype.isPrototypeOf.call(EFruit, EFruitBase));
    expect(EAnimal.Cat instanceof EAnimal).toBe(true);
    expect(EAnimal.Cat instanceof EFruit).toBe(false);
  });
});

describe('Overriding "eq"', () => {
  enum Level { Low = 'low', Medium = 'medium', High = 'high' }
  class ELevel extends extend<typeof Level, Level>(Level) {
    eq(other: string): boolean {
      return this.valueOf().charAt(0) === other.toString().toLowerCase().charAt(0);
    }
  }

  it('also updates behavior of "is"', () => {
    expect(ELevel.Low.is(ELevel.Low)).toBe(true);
    expect(ELevel.Low.is(ELevel.Medium)).toBe(false);
    expect(ELevel.Low.is('LOW')).toBe(true);
    expect(ELevel.Low.is('MEDIUM')).toBe(false);
    expect(ELevel.Medium.is('medium')).toBe(true);
    expect(ELevel.Medium.is('M')).toBe(true);
    expect(ELevel.Medium.is('high')).toBe(false);
    expect(ELevel.High.is('VERY_HIGH')).toBe(false);
    expect(ELevel.High.is('h')).toBe(true);
  });

  it('also updates behavior of "isNot"', () => {
    expect(ELevel.Low.isNot(ELevel.Low)).toBe(false);
    expect(ELevel.Low.isNot(ELevel.Medium)).toBe(true);
    expect(ELevel.Low.isNot('LOW')).toBe(false);
    expect(ELevel.Low.isNot('MEDIUM')).toBe(true);
    expect(ELevel.Medium.isNot('medium')).toBe(false);
    expect(ELevel.Medium.isNot('M')).toBe(false);
    expect(ELevel.Medium.isNot('high')).toBe(true);
    expect(ELevel.High.isNot('VERY_HIGH')).toBe(true);
    expect(ELevel.High.isNot('h')).toBe(false);
  });

  it('also updates behavior of "from"', () => {
    expect(ELevel.from('l')).toBe(ELevel.Low);
    expect(ELevel.from('m')).toBe(ELevel.Medium);
    expect(ELevel.from('h')).toBe(ELevel.High);
    expect(() => ELevel.from('_')).not.toThrow();
    expect(ELevel.from('_')).toBe(undefined);
    expect(ELevel.from('_', Level.Low)).toBe(ELevel.Low);
  });

  it('also updates behavior of "match"', () => {
    expect(ELevel.Low.match({
      l: 10,
      m: 20,
      h: 30,
    })).toBe(10);

    expect(ELevel.High.match([
      ['LOW', 'easy'],
      ['MEDIUM', 'average'],
      ['HIGH', 'difficult'],
    ])).toBe('difficult');

    expect(ELevel.Low.match({
      a: 'a',
      b: 'b',
      c: 'c',
    }, 'fallback')).toBe('fallback');
  });
});

describe('Overriding "values"', () => {
  enum Animal { Cat, Dog, Fox, $Unknown }
  class EAnimal extends extend<typeof Animal, Animal>(Animal) {
    static values = function* overrided() {
      yield EAnimal.Cat;
      yield EAnimal.Dog;
      yield EAnimal.Fox;
    };
  }

  it('does updates the overrided field', () => {
    expect(pipe(
      EAnimal.values(),
      toArray,
    )).toEqual([
      EAnimal.Cat,
      EAnimal.Dog,
      EAnimal.Fox,
    ]);
  });

  it('also updates behavior of "entries"', () => {
    expect(pipe(
      EAnimal.entries(),
      toArray,
    )).toEqual([
      ['Cat', EAnimal.Cat],
      ['Dog', EAnimal.Dog],
      ['Fox', EAnimal.Fox],
    ]);
  });

  it('also updates behavior of "[Symbol.iterator]"()', () => {
    expect(pipe(
      EAnimal,
      toArray,
    )).toEqual([
      EAnimal.Cat,
      EAnimal.Dog,
      EAnimal.Fox,
    ]);
  });

  it('also updates behavior of "from"', () => {
    expect(EAnimal.from(0)).toBe(EAnimal.Cat);
    expect(EAnimal.from(3)).not.toBe(EAnimal.$Unknown);
    expect(EAnimal.from(3)).toBe(undefined);
  });
});
