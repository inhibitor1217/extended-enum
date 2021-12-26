import type { ExtendedEnumPatternMatcher } from './match.type';
import type { ExtendedEnumStatic } from './type';
import {
  checks,
  equal,
  extend,
} from './test/typecheck';

enum Fruit { Apple, Orange, Strawberry }
enum Animal { Cat = 'CAT', Dog = 'DOG' }

declare const EFruit: ExtendedEnumStatic<typeof Fruit, Fruit>;
declare const EAnimal: ExtendedEnumStatic<typeof Animal, Animal>;

declare const fruitMatch: ExtendedEnumPatternMatcher<typeof Fruit, Fruit>;
declare const animalMatch: ExtendedEnumPatternMatcher<typeof Animal, Animal>;

/* pattern as object */
(function patternAsObject() {
  const f1 = fruitMatch({});

  const f2 = fruitMatch({ 0: 0, 1: 1 });

  const f3 = animalMatch({
    [Animal.Cat]: Animal.Dog,
    [Animal.Dog]: Animal.Cat,
  });

  const f4 = animalMatch<{ foo?: string, lorem?: string }>({
    CAT: { foo: 'bar' },
    DOG: { lorem: 'ipsum' },
  });

  const f5 = fruitMatch({
    Orange: [Fruit.Orange, 'orange'] as const,
    Strawberry: [Fruit.Strawberry, 'strawberry'] as const,
  });

  const f6 = fruitMatch({
    0: 'lorem',
    1: 'ipsum',
    2: 'dolor',
  });

  checks(
    equal<typeof f1, unknown>(),
    equal<typeof f2, number | undefined>(),
    equal<typeof f3, Animal | undefined>(),
    equal<typeof f4, { foo?: string, lorem?: string } | undefined>(),
    extend<typeof f5, readonly [Fruit, string] | undefined>(),
    equal<typeof f6, string | undefined>(),
  );
}());

/* pattern as array */
(function patternAsArray() {
  const f1 = fruitMatch([]);

  const f2 = fruitMatch([
    [0, 0],
    [0, 1],
  ]);

  const f3 = animalMatch([
    [Animal.Cat, Animal.Dog],
    [Animal.Dog, Animal.Cat],
  ]);

  const f4 = animalMatch<{ foo?: string, lorem?: string }>([
    ['CAT', { foo: 'bar' }],
    ['DOG', { lorem: 'ipsum' }],
  ]);

  const f5 = fruitMatch([
    ['Orange', [Fruit.Orange, 'orange'] as const],
    ['Strawberry', [Fruit.Strawberry, 'strawberry'] as const],
  ]);

  const f6 = fruitMatch([
    [0, 'lorem'],
    [1, 'ipsum'],
    [2, 'dolor'],
  ]);

  const f7 = animalMatch([
    [EAnimal.Cat, 1],
    [EAnimal.Dog, 2],
    [EAnimal.Cat, 3],
  ]);

  const f8 = fruitMatch([
    [EFruit.Strawberry, [[3, 2], [2, 9, 7]]],
  ]);

  const f9 = fruitMatch([
    [[Fruit.Apple, Fruit.Orange], 'apple_or_orange' as const],
    [Fruit.Strawberry, 'strawberry' as const],
  ]);

  checks(
    equal<typeof f1, unknown>(),
    equal<typeof f2, number | undefined>(),
    equal<typeof f3, Animal | undefined>(),
    equal<typeof f4, { foo?: string, lorem?: string } | undefined>(),
    extend<typeof f5, readonly [Fruit, string] | undefined>(),
    equal<typeof f6, string | undefined>(),
    equal<typeof f7, number | undefined>(),
    equal<typeof f8, number[][] | undefined>(),
    equal<typeof f9, 'apple_or_orange' | 'strawberry' | undefined>(),
  );
}());

/* mixed keys, pattern as object */
(function mixedKeysPatternAsObject() {
  const f1 = animalMatch({
    Cat: 'foo',
    CAT: 'bar',
  });

  const f2 = fruitMatch({
    0: ['lorem'],
    1: ['ipsum'],
    Strawberry: ['dolor'],
  });

  const f3 = animalMatch({
    Cat: { foo: 'bar' },
    DOG: null,
  });

  const f4 = fruitMatch({
    Orange: undefined,
    [Fruit.Apple]: undefined,
  });

  checks(
    equal<typeof f1, string | undefined>(),
    equal<typeof f2, string[] | undefined>(),
    equal<typeof f3, { foo: string } | null | undefined>(),
    equal<typeof f4, undefined>(),
  );
}());

/* mixed keys, pattern as array */
(function mixedKeysPatternAsObject() {
  const f1 = animalMatch([
    ['Cat', 'foo' as const],
    ['CAT', 'bar' as const],
    [EAnimal.Cat, 'baz' as const],
    [Animal.Cat, 'bar' as const],
  ]);

  const f2 = fruitMatch([
    [0, ['lorem']],
    [Fruit.Orange, ['ipsum']],
    ['Strawberry', ['dolor']],
    [EFruit.Strawberry, ['lorem']],
    [EFruit.Orange, ['ipsum']],
  ]);

  const f3 = animalMatch([
    ['Cat', { foo: 'bar' }],
    ['DOG', null],
  ]);

  const f4 = fruitMatch([
    ['Orange', undefined],
    [EFruit.Apple, undefined],
  ]);

  const f5 = fruitMatch([
    [[0, 'Apple', Fruit.Apple], 'Fruit.Apple' as const],
    [[1, 'Orange', Fruit.Orange], 'Fruit.Orange' as const],
    [[2, 'Strawberry', Fruit.Strawberry], 'Fruit.Strawberry' as const],
  ]);

  checks(
    equal<typeof f1, 'foo' | 'bar' | 'baz' | undefined>(),
    equal<typeof f2, string[] | undefined>(),
    equal<typeof f3, { foo: string } | null | undefined>(),
    equal<typeof f4, undefined>(),
    equal<typeof f5, 'Fruit.Apple' | 'Fruit.Orange' | 'Fruit.Strawberry' | undefined>(),
  );
}());

/* with default value, pattern as object */
(function patternAsObjectWithDefaultValue() {
  const f1 = fruitMatch({}, null);

  const f2 = fruitMatch({ 0: 0, 1: 1 }, 2);

  const f3 = animalMatch(
    {
      [Animal.Cat]: Animal.Dog,
      [Animal.Dog]: Animal.Cat,
    },
    Animal.Cat,
  );

  const f4 = animalMatch<{ foo?: string, lorem?: string }>(
    {
      CAT: { foo: 'bar' },
      DOG: { lorem: 'ipsum' },
    },
    { foo: 'bar' },
  );

  const f5 = fruitMatch(
    {
      Orange: [Fruit.Orange, 'orange'] as const,
      Strawberry: [Fruit.Strawberry, 'strawberry'] as const,
    },
    [Fruit.Apple, 'unknown'] as const,
  );

  const f6 = fruitMatch(
    {
      0: 'lorem',
      1: 'ipsum',
      2: 'dolor',
    },
    'amet',
  );

  checks(
    equal<typeof f1, unknown>(),
    equal<typeof f2, number>(),
    equal<typeof f3, Animal>(),
    equal<typeof f4, { foo?: string, lorem?: string }>(),
    extend<typeof f5, readonly [Fruit, string]>(),
    equal<typeof f6, string>(),
  );
}());

/* with default value, pattern as array */
(function patternAsArrayWithDefaultValue() {
  const f1 = fruitMatch([], null);

  const f2 = fruitMatch(
    [
      [0, 0],
      [0, 1],
    ],
    -1,
  );

  const f3 = animalMatch(
    [
      [Animal.Cat, Animal.Dog],
      [Animal.Dog, Animal.Cat],
    ],
    Animal.Cat,
  );

  const f4 = animalMatch<{ foo?: string, lorem?: string }>(
    [
      ['CAT', { foo: 'bar' }],
      ['DOG', { lorem: 'ipsum' }],
    ],
    { foo: 'bar' },
  );

  const f5 = fruitMatch(
    [
      ['Orange', [Fruit.Orange, 'orange'] as const],
      ['Strawberry', [Fruit.Strawberry, 'strawberry'] as const],
    ],
    [Fruit.Apple, 'unknown'] as const,
  );

  const f6 = fruitMatch(
    [
      [0, 'lorem' as const],
      [1, 'ipsum' as const],
      [2, 'dolor' as const],
    ],
    'amet' as const,
  );

  const f7 = animalMatch(
    [
      [EAnimal.Cat, 1],
      [EAnimal.Dog, 2],
      [EAnimal.Cat, 3],
    ],
    null,
  );

  const f8 = fruitMatch(
    [
      [EFruit.Strawberry, [[3, 2], [2, 9, 7]]],
    ],
    [] as number[][],
  );

  const f9 = fruitMatch(
    [
      [[0, 'Apple', Fruit.Apple], 'Fruit.Apple' as const],
      [[1, 'Orange', Fruit.Orange], 'Fruit.Orange' as const],
      [[2, 'Strawberry', Fruit.Strawberry], 'Fruit.Strawberry' as const],
    ],
    'Fruit.Unknown' as const,
  );

  checks(
    equal<typeof f1, unknown>(),
    equal<typeof f2, number>(),
    equal<typeof f3, Animal>(),
    equal<typeof f4, { foo?: string, lorem?: string }>(),
    extend<typeof f5, readonly [Fruit, string]>(),
    equal<typeof f6, 'lorem' | 'ipsum' | 'dolor' | 'amet'>(),
    equal<typeof f7, number | null>(),
    equal<typeof f8, number[][]>(),
    equal<typeof f9, `Fruit.${'Apple' | 'Orange' | 'Strawberry' | 'Unknown'}`>(),
  );
}());
