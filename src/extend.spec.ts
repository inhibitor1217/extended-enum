import extend from './extend';

enum FruitP {
  Apple = 'apple',
  Pear = 'pear',
  Strawberry = 'strawberry',
}

enum AnimalP {
  Cat,
  Dog,
  Elephant,
  Fox,
}

enum OsP {
  Windows,
  MacOS,
  iOS = 'iOS',
  Android = 'android',
}

enum EmptyP {}

const Fruit = extend<typeof FruitP, FruitP>(FruitP);
const Animal = extend<typeof AnimalP, AnimalP>(AnimalP);
const Os = extend<typeof OsP, OsP>(OsP);
const Empty = extend<typeof EmptyP, EmptyP>(EmptyP);

describe('static of()', () => {
  it('should not fail', () => {
    expect(() => Fruit.of(FruitP.Pear)).not.toThrow();
    expect(() => Animal.of(AnimalP.Cat)).not.toThrow();
    expect(() => Os.of(OsP.MacOS)).not.toThrow();
  });

  it('should return same instance from same primitive', () => {
    expect(Fruit.of(FruitP.Apple)).toBe(Fruit.of(FruitP.Apple));
    expect(Animal.of(AnimalP.Elephant)).toBe(Animal.of(AnimalP.Elephant));
    expect(Os.of(OsP.Windows)).toBe(Os.of(OsP.Windows));
  });

  it('should return instance different from instances of other primitives', () => {
    expect(Fruit.of(FruitP.Strawberry)).not.toBe(Fruit.of(FruitP.Apple));
    expect(Animal.of(AnimalP.Cat)).not.toBe(Animal.of(AnimalP.Fox));
    expect(Os.of(OsP.iOS)).not.toBe(Os.of(OsP.Android));
  });
});

describe('static from()', () => {
  it('should not fail', () => {
    expect(() => Fruit.from('apple')).not.toThrow();
    expect(() => Fruit.from('orange')).not.toThrow();
    expect(() => Fruit.from('orange', FruitP.Pear)).not.toThrow();
  });

  it('should parse if given primitive is one of specified values', () => {
    expect(Animal.from(0)).toBe(Animal.of(AnimalP.Cat));
    expect(Os.from('iOS')).toBe(Os.of(OsP.iOS));
    expect(Animal.from(3)).toBe(Animal.of(AnimalP.Fox));
  });

  it('should return undefined if no fallback is given, and given primitive is not among specified values', () => {
    expect(Animal.from(-1)).toBe(undefined);
    expect(Animal.from('hello')).toBe(undefined);
    expect(Animal.from('Cat')).toBe(undefined);
    expect(Fruit.from('Apple')).toBe(undefined);
    expect(Fruit.from('orange')).toBe(undefined);
    expect(Os.from('ubuntu')).toBe(undefined);
    expect(Empty.from('')).toBe(undefined);
    expect(Empty.from(undefined)).toBe(undefined);
  });

  it('should return fallback if it is specified, and given primitive is not among specified values', () => {
    expect(Animal.from(-1, AnimalP.Cat)).toBe(Animal.of(AnimalP.Cat));
    expect(Animal.from('hello', AnimalP.Dog)).toBe(Animal.of(AnimalP.Dog));
    expect(Animal.from('Cat', AnimalP.Elephant)).toBe(Animal.of(AnimalP.Elephant));
    expect(Fruit.from('Apple', FruitP.Strawberry)).toBe(Fruit.of(FruitP.Strawberry));
    expect(Fruit.from('orange', FruitP.Apple)).toBe(Fruit.of(FruitP.Apple));
    expect(Os.from('ubuntu', OsP.Windows)).toBe(Os.of(OsP.Windows));
  });
});

describe('static keys()', () => {
  it('should return keys excluding reverse mapped keys, in definition order', () => {
    expect([...Fruit.keys()]).toEqual(['Apple', 'Pear', 'Strawberry']);
    expect([...Animal.keys()]).toEqual(['Cat', 'Dog', 'Elephant', 'Fox']);
    expect([...Os.keys()]).toEqual(['Windows', 'MacOS', 'iOS', 'Android']);
    expect([...Empty.keys()]).toEqual([]);
  });
});

describe('static values()', () => {
  it('should return all instances, in definition order', () => {
    expect([...Fruit.values()])
      .toEqual([
        Fruit.of(FruitP.Apple),
        Fruit.of(FruitP.Pear),
        Fruit.of(FruitP.Strawberry),
      ]);

    expect([...Animal.values()])
      .toEqual([
        Animal.of(AnimalP.Cat),
        Animal.of(AnimalP.Dog),
        Animal.of(AnimalP.Elephant),
        Animal.of(AnimalP.Fox),
      ]);

    expect([...Os.values()])
      .toEqual([
        Os.of(OsP.Windows),
        Os.of(OsP.MacOS),
        Os.of(OsP.iOS),
        Os.of(OsP.Android),
      ]);

    expect([...Empty.values()]).toEqual([]);
  });
});

describe('static rawValues()', () => {
  it('should return all primitives, in definition order', () => {
    expect([...Fruit.rawValues()])
      .toEqual([
        'apple',
        'pear',
        'strawberry',
      ]);

    expect([...Animal.rawValues()])
      .toEqual([
        0,
        1,
        2,
        3,
      ]);

    expect([...Os.rawValues()])
      .toEqual([
        0,
        1,
        'iOS',
        'android',
      ]);

    expect([...Empty.rawValues()])
      .toEqual([]);
  });
});

describe('static entries()', () => {
  it('should return tuples of key and instance, in definition order', () => {
    expect([...Fruit.entries()])
      .toEqual([
        ['Apple', Fruit.of(FruitP.Apple)],
        ['Pear', Fruit.of(FruitP.Pear)],
        ['Strawberry', Fruit.of(FruitP.Strawberry)],
      ]);

    expect([...Animal.entries()])
      .toEqual([
        ['Cat', Animal.of(AnimalP.Cat)],
        ['Dog', Animal.of(AnimalP.Dog)],
        ['Elephant', Animal.of(AnimalP.Elephant)],
        ['Fox', Animal.of(AnimalP.Fox)],
      ]);

    expect([...Os.entries()])
      .toEqual([
        ['Windows', Os.of(OsP.Windows)],
        ['MacOS', Os.of(OsP.MacOS)],
        ['iOS', Os.of(OsP.iOS)],
        ['Android', Os.of(OsP.Android)],
      ]);

    expect([...Empty.entries()])
      .toEqual([]);
  });
});

describe('static [Symbol.iterator]()', () => {
  it('should be iterable', () => {
    expect([...Fruit])
      .toEqual([
        Fruit.of(FruitP.Apple),
        Fruit.of(FruitP.Pear),
        Fruit.of(FruitP.Strawberry),
      ]);

    expect([...Animal])
      .toEqual([
        Animal.of(AnimalP.Cat),
        Animal.of(AnimalP.Dog),
        Animal.of(AnimalP.Elephant),
        Animal.of(AnimalP.Fox),
      ]);

    expect([...Os])
      .toEqual([
        Os.of(OsP.Windows),
        Os.of(OsP.MacOS),
        Os.of(OsP.iOS),
        Os.of(OsP.Android),
      ]);

    expect([...Empty])
      .toEqual([]);
  });
});

describe('is', () => {
  it('should work with primitives', () => {
    expect(Fruit.of(FruitP.Apple).is('apple')).toBe(true);
    expect(Fruit.of(FruitP.Apple).is('Apple')).toBe(false);
    expect(Fruit.of(FruitP.Apple).is('pear')).toBe(false);
    expect(Animal.of(AnimalP.Fox).is(3)).toBe(true);
    expect(Animal.of(AnimalP.Fox).is('Fox')).toBe(false);
    expect(Animal.of(AnimalP.Fox).is('fox')).toBe(false);
    expect(Animal.of(AnimalP.Fox).is(AnimalP.Fox)).toBe(true);
    expect(Animal.of(AnimalP.Fox).is(AnimalP.Dog)).toBe(false);
  });

  it('should work with instances', () => {
    expect(Os.of(OsP.Android).is(Os.of(OsP.Android))).toBe(true);
    expect(Os.of(OsP.Android).is(Os.of(OsP.iOS))).toBe(false);
  });
});

describe('is.not', () => {
  it('should work with primitives', () => {
    expect(Fruit.of(FruitP.Apple).is.not('apple')).toBe(false);
    expect(Fruit.of(FruitP.Apple).is.not('Apple')).toBe(true);
    expect(Fruit.of(FruitP.Apple).is.not('pear')).toBe(true);
    expect(Animal.of(AnimalP.Fox).is.not(3)).toBe(false);
    expect(Animal.of(AnimalP.Fox).is.not('Fox')).toBe(true);
    expect(Animal.of(AnimalP.Fox).is.not('fox')).toBe(true);
    expect(Animal.of(AnimalP.Fox).is.not(AnimalP.Fox)).toBe(false);
    expect(Animal.of(AnimalP.Fox).is.not(AnimalP.Dog)).toBe(true);
  });

  it('should work with instances', () => {
    expect(Os.of(OsP.Android).is.not(Os.of(OsP.Android))).toBe(false);
    expect(Os.of(OsP.Android).is.not(Os.of(OsP.iOS))).toBe(true);
  });
});

describe('valueOf', () => {
  it('should return a primitive associated with given instance', () => {
    expect(Fruit.of(FruitP.Pear).valueOf()).toBe('pear');
    expect(Animal.of(AnimalP.Elephant).valueOf()).toBe(2);
    expect(Os.of(OsP.MacOS).valueOf()).toBe(1);
    expect(Os.of(OsP.Android).valueOf()).toBe('android');
  });
});

describe('toString', () => {
  it('should return string', () => {
    expect(typeof Fruit.of(FruitP.Apple).toString()).toBe('string');
    expect(typeof Animal.of(AnimalP.Dog).toString()).toBe('string');
    expect(typeof Os.of(OsP.Windows).toString()).toBe('string');
  });

  it('should return primitive, or a stringified of primitive if it is number', () => {
    expect(Fruit.of(FruitP.Apple).toString()).toBe('apple');
    expect(Animal.of(AnimalP.Dog).toString()).toBe('1');
    expect(Os.of(OsP.Windows).toString()).toBe('0');
  });
});

describe('toJSON', () => {
  it('should work when instance is among nested fields', () => {
    const obj = {
      foo: {
        bar: {
          animal: Animal.of(AnimalP.Cat),
        },
      },
      fruits: [
        Fruit.of(FruitP.Strawberry),
        Fruit.of(FruitP.Pear),
      ],
      desktop: Os.of(OsP.MacOS),
      mobile: Os.of(OsP.iOS),
    };

    expect(JSON.stringify(obj)).toBe('{"foo":{"bar":{"animal":0}},"fruits":["strawberry","pear"],"desktop":1,"mobile":"iOS"}');
  });
});

describe('key accessors', () => {
  it('returns correct instaces', () => {
    expect(Fruit.Apple.valueOf()).toBe('apple');
    expect(Animal.Dog.valueOf()).toBe(1);
    expect(Os.iOS.valueOf()).toBe('iOS');

    expect(Fruit.Apple.is(Fruit.Apple)).toBe(true);
    expect(Fruit.Apple.is.not(Fruit.Pear)).toBe(true);
    expect(Animal.Cat.is(AnimalP.Cat)).toBe(true);
    expect(Animal.Cat.is(0)).toBe(true);
    expect(Animal.Cat.is(Animal.of(AnimalP.Cat))).toBe(true);
    expect(Animal.Cat.is(Animal.Dog)).toBe(false);
    expect(Animal.Cat.is.not(Animal.Fox)).toBe(true);
  });

  it('returns the same instance with using "of"', () => {
    expect(Fruit.Strawberry).toBe(Fruit.of(FruitP.Strawberry));
    expect(Animal.Dog).toBe(Animal.of(AnimalP.Dog));
  });
});
