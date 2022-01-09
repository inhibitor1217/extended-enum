/* eslint-disable max-classes-per-file */

import extend from './extend';

enum Fruit {
  Apple = 'apple',
  Pear = 'pear',
  Strawberry = 'strawberry',
}

enum Animal {
  Cat,
  Dog,
  Elephant,
  Fox,
}

enum Os {
  Windows,
  MacOS,
  iOS = 'iOS',
  Android = 'android',
}

enum Empty {}

class EFruit extends extend<typeof Fruit, Fruit>(Fruit) {}
class EAnimal extends extend<typeof Animal, Animal>(Animal) {}
class EOs extends extend<typeof Os, Os>(Os) {}
class EEmpty extends extend<typeof Empty, Empty>(Empty) {}

describe('static of()', () => {
  it('should not fail', () => {
    expect(() => EFruit.of(Fruit.Pear)).not.toThrow();
    expect(() => EAnimal.of(Animal.Cat)).not.toThrow();
    expect(() => EOs.of(Os.MacOS)).not.toThrow();
  });

  it('should return same instance from same primitive', () => {
    expect(EFruit.of(Fruit.Apple)).toBe(EFruit.of(Fruit.Apple));
    expect(EAnimal.of(Animal.Elephant)).toBe(EAnimal.of(Animal.Elephant));
    expect(EOs.of(Os.Windows)).toBe(EOs.of(Os.Windows));
  });

  it('should return instance different from instances of other primitives', () => {
    expect(EFruit.of(Fruit.Strawberry)).not.toBe(EFruit.of(Fruit.Apple));
    expect(EAnimal.of(Animal.Cat)).not.toBe(EAnimal.of(Animal.Fox));
    expect(EOs.of(Os.iOS)).not.toBe(EOs.of(Os.Android));
  });

  it('should fail if called with value not defined at original enumeration', () => {
    // @ts-ignore
    expect(() => EFruit.of('APPLE')).toThrow();

    // @ts-ignore
    expect(() => EAnimal.of(-1)).toThrow();
  });
});

describe('static from()', () => {
  it('should not fail', () => {
    expect(() => EFruit.from('apple')).not.toThrow();
    expect(() => EFruit.from('orange')).not.toThrow();
    expect(() => EFruit.from('orange', Fruit.Pear)).not.toThrow();
  });

  it('should parse if given primitive is one of specified values', () => {
    expect(EAnimal.from(0)).toBe(EAnimal.of(Animal.Cat));
    expect(EOs.from('iOS')).toBe(EOs.of(Os.iOS));
    expect(EAnimal.from(3)).toBe(EAnimal.of(Animal.Fox));
  });

  it('should return undefined if no fallback is given, and given primitive is not among specified values', () => {
    expect(EAnimal.from(-1)).toBe(undefined);
    expect(EAnimal.from('hello')).toBe(undefined);
    expect(EAnimal.from('Cat')).toBe(undefined);
    expect(EFruit.from('Apple')).toBe(undefined);
    expect(EFruit.from('orange')).toBe(undefined);
    expect(EOs.from('ubuntu')).toBe(undefined);
    expect(EEmpty.from('')).toBe(undefined);
    expect(EEmpty.from(undefined)).toBe(undefined);
  });

  it('should return fallback if it is specified, and given primitive is not among specified values', () => {
    expect(EAnimal.from(-1, Animal.Cat)).toBe(EAnimal.of(Animal.Cat));
    expect(EAnimal.from('hello', Animal.Dog)).toBe(EAnimal.of(Animal.Dog));
    expect(EAnimal.from('Cat', Animal.Elephant)).toBe(EAnimal.of(Animal.Elephant));
    expect(EFruit.from('Apple', Fruit.Strawberry)).toBe(EFruit.of(Fruit.Strawberry));
    expect(EFruit.from('orange', Fruit.Apple)).toBe(EFruit.of(Fruit.Apple));
    expect(EOs.from('ubuntu', Os.Windows)).toBe(EOs.of(Os.Windows));
  });
});

describe('static keys()', () => {
  it('should return keys excluding reverse mapped keys, in definition order', () => {
    expect([...EFruit.keys()]).toEqual(['Apple', 'Pear', 'Strawberry']);
    expect([...EAnimal.keys()]).toEqual(['Cat', 'Dog', 'Elephant', 'Fox']);
    expect([...EOs.keys()]).toEqual(['Windows', 'MacOS', 'iOS', 'Android']);
    expect([...EEmpty.keys()]).toEqual([]);
  });
});

describe('static values()', () => {
  it('should return all instances, in definition order', () => {
    expect([...EFruit.values()])
      .toEqual([
        EFruit.of(Fruit.Apple),
        EFruit.of(Fruit.Pear),
        EFruit.of(Fruit.Strawberry),
      ]);

    expect([...EAnimal.values()])
      .toEqual([
        EAnimal.of(Animal.Cat),
        EAnimal.of(Animal.Dog),
        EAnimal.of(Animal.Elephant),
        EAnimal.of(Animal.Fox),
      ]);

    expect([...EOs.values()])
      .toEqual([
        EOs.of(Os.Windows),
        EOs.of(Os.MacOS),
        EOs.of(Os.iOS),
        EOs.of(Os.Android),
      ]);

    expect([...EEmpty.values()]).toEqual([]);
  });
});

describe('static rawValues()', () => {
  it('should return all primitives, in definition order', () => {
    expect([...EFruit.rawValues()])
      .toEqual([
        'apple',
        'pear',
        'strawberry',
      ]);

    expect([...EAnimal.rawValues()])
      .toEqual([
        0,
        1,
        2,
        3,
      ]);

    expect([...EOs.rawValues()])
      .toEqual([
        0,
        1,
        'iOS',
        'android',
      ]);

    expect([...EEmpty.rawValues()])
      .toEqual([]);
  });
});

describe('static entries()', () => {
  it('should return tuples of key and instance, in definition order', () => {
    expect([...EFruit.entries()])
      .toEqual([
        ['Apple', EFruit.of(Fruit.Apple)],
        ['Pear', EFruit.of(Fruit.Pear)],
        ['Strawberry', EFruit.of(Fruit.Strawberry)],
      ]);

    expect([...EAnimal.entries()])
      .toEqual([
        ['Cat', EAnimal.of(Animal.Cat)],
        ['Dog', EAnimal.of(Animal.Dog)],
        ['Elephant', EAnimal.of(Animal.Elephant)],
        ['Fox', EAnimal.of(Animal.Fox)],
      ]);

    expect([...EOs.entries()])
      .toEqual([
        ['Windows', EOs.of(Os.Windows)],
        ['MacOS', EOs.of(Os.MacOS)],
        ['iOS', EOs.of(Os.iOS)],
        ['Android', EOs.of(Os.Android)],
      ]);

    expect([...EEmpty.entries()])
      .toEqual([]);
  });
});

describe('static [Symbol.iterator]()', () => {
  it('should be iterable', () => {
    expect([...EFruit])
      .toEqual([
        EFruit.of(Fruit.Apple),
        EFruit.of(Fruit.Pear),
        EFruit.of(Fruit.Strawberry),
      ]);

    expect([...EAnimal])
      .toEqual([
        EAnimal.of(Animal.Cat),
        EAnimal.of(Animal.Dog),
        EAnimal.of(Animal.Elephant),
        EAnimal.of(Animal.Fox),
      ]);

    expect([...EOs])
      .toEqual([
        EOs.of(Os.Windows),
        EOs.of(Os.MacOS),
        EOs.of(Os.iOS),
        EOs.of(Os.Android),
      ]);

    expect([...EEmpty])
      .toEqual([]);
  });
});

describe('is', () => {
  it('should work with primitives', () => {
    expect(EFruit.of(Fruit.Apple).is('apple')).toBe(true);
    expect(EFruit.of(Fruit.Apple).is('Apple')).toBe(false);
    expect(EFruit.of(Fruit.Apple).is('pear')).toBe(false);
    expect(EAnimal.of(Animal.Fox).is(3)).toBe(true);
    expect(EAnimal.of(Animal.Fox).is('Fox')).toBe(false);
    expect(EAnimal.of(Animal.Fox).is('fox')).toBe(false);
    expect(EAnimal.of(Animal.Fox).is(Animal.Fox)).toBe(true);
    expect(EAnimal.of(Animal.Fox).is(Animal.Dog)).toBe(false);
  });

  it('should work with instances', () => {
    expect(EOs.of(Os.Android).is(EOs.of(Os.Android))).toBe(true);
    expect(EOs.of(Os.Android).is(EOs.of(Os.iOS))).toBe(false);
  });
});

describe('isNot', () => {
  it('should work with primitives', () => {
    expect(EFruit.of(Fruit.Apple).isNot('apple')).toBe(false);
    expect(EFruit.of(Fruit.Apple).isNot('Apple')).toBe(true);
    expect(EFruit.of(Fruit.Apple).isNot('pear')).toBe(true);
    expect(EAnimal.of(Animal.Fox).isNot(3)).toBe(false);
    expect(EAnimal.of(Animal.Fox).isNot('Fox')).toBe(true);
    expect(EAnimal.of(Animal.Fox).isNot('fox')).toBe(true);
    expect(EAnimal.of(Animal.Fox).isNot(Animal.Fox)).toBe(false);
    expect(EAnimal.of(Animal.Fox).isNot(Animal.Dog)).toBe(true);
  });

  it('should work with instances', () => {
    expect(EOs.of(Os.Android).isNot(EOs.of(Os.Android))).toBe(false);
    expect(EOs.of(Os.Android).isNot(EOs.of(Os.iOS))).toBe(true);
  });
});

describe('keyOf', () => {
  it('should return a key associated with given instance', () => {
    expect(EFruit.of(Fruit.Strawberry).keyOf()).toBe('Strawberry');
    expect(EFruit.Apple.keyOf()).toBe('Apple');
    expect(EOs.iOS.keyOf()).toBe('iOS');
  });
});

describe('valueOf', () => {
  it('should return a primitive associated with given instance', () => {
    expect(EFruit.of(Fruit.Pear).valueOf()).toBe('pear');
    expect(EAnimal.of(Animal.Elephant).valueOf()).toBe(2);
    expect(EOs.of(Os.MacOS).valueOf()).toBe(1);
    expect(EOs.of(Os.Android).valueOf()).toBe('android');
  });
});

describe('toString', () => {
  it('should return string', () => {
    expect(typeof EFruit.of(Fruit.Apple).toString()).toBe('string');
    expect(typeof EAnimal.of(Animal.Dog).toString()).toBe('string');
    expect(typeof EOs.of(Os.Windows).toString()).toBe('string');
  });

  it('should return primitive, or a stringified of primitive if it is number', () => {
    expect(EFruit.of(Fruit.Apple).toString()).toBe('apple');
    expect(EAnimal.of(Animal.Dog).toString()).toBe('1');
    expect(EOs.of(Os.Windows).toString()).toBe('0');
  });
});

describe('toJSON', () => {
  it('should work when instance is among nested fields', () => {
    const obj = {
      foo: {
        bar: {
          animal: EAnimal.of(Animal.Cat),
        },
      },
      fruits: [
        EFruit.of(Fruit.Strawberry),
        EFruit.of(Fruit.Pear),
      ],
      desktop: EOs.of(Os.MacOS),
      mobile: EOs.of(Os.iOS),
    };

    expect(JSON.stringify(obj)).toBe('{"foo":{"bar":{"animal":0}},"fruits":["strawberry","pear"],"desktop":1,"mobile":"iOS"}');
  });
});

describe('key accessors', () => {
  it('returns correct instaces', () => {
    expect(EFruit.Apple.valueOf()).toBe('apple');
    expect(EAnimal.Dog.valueOf()).toBe(1);
    expect(EOs.iOS.valueOf()).toBe('iOS');

    expect(EFruit.Apple.is(EFruit.Apple)).toBe(true);
    expect(EFruit.Apple.isNot(EFruit.Pear)).toBe(true);
    expect(EAnimal.Cat.is(Animal.Cat)).toBe(true);
    expect(EAnimal.Cat.is(0)).toBe(true);
    expect(EAnimal.Cat.is(EAnimal.of(Animal.Cat))).toBe(true);
    expect(EAnimal.Cat.is(EAnimal.Dog)).toBe(false);
    expect(EAnimal.Cat.isNot(EAnimal.Fox)).toBe(true);
  });

  it('returns the same instance with using "of"', () => {
    expect(EFruit.Strawberry).toBe(EFruit.of(Fruit.Strawberry));
    expect(EAnimal.Dog).toBe(EAnimal.of(Animal.Dog));
  });
});

describe('static keyOf()', () => {
  it('should return a key associated with given primitive', () => {
    expect(EFruit.keyOf(Fruit.Pear)).toBe('Pear');
    expect(EAnimal.keyOf(2)).toBe('Elephant');
    expect(EOs.keyOf(Os.Android)).toBe('Android');
  });

  it('should return a key associated with given instance', () => {
    expect(EFruit.keyOf(EFruit.Strawberry)).toBe('Strawberry');
    expect(EAnimal.keyOf(EAnimal.Fox)).toBe('Fox');
    expect(EOs.keyOf(EOs.MacOS)).toBe('MacOS');
  });
});

describe('false constructor', () => {
  it('should throw', () => {
    expect(() => new EFruit()).toThrow();
    expect(() => new EAnimal()).toThrow();
    expect(() => new EOs()).toThrow();
    expect(() => new EEmpty()).toThrow();
  });
});
