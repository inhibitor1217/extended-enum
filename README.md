<h1 align="center">extended-enum</h1>
<h4 align="center">An extension for TypeScript enums to grant object-oriented powers</h4>

## Installation

Install via `npm` or `yarn`:

```sh
# NPM
npm i extended-enum@latest

# Yarn
yarn add extended-enum@latest
```

## How to use it?

`extended-enum` exposes a utility function named `extend`. Simply wrap an enum with `extend`, then you are ready to go!

```typescript
import { extend } from 'extended-enum';
// you may import using CommonJS syntax
// const { extend } = require('extended-enum');

enum _Animal {
  Bird,
  Cat,
  Dog,
}

// use the utility as follows:
class Animal extends extend<typeof _Animal, _Animal>(_Animal) {}
```

NOTE: you cannot use `extend` with `const enum`s, which are non-objects in runtime.

## What powers does it have?

### Basic functionalities

`extend`ed enumerations preserves all the functionality of TypeScript `enum`s, such as:

- Reference all the enumerated values using the key. The reference equality is preserved.

```typescript
// access values using keys
const pet = Animal.Cat;
const pets = [Animal.Dog];

// reference equality is preserved
expect(Animal.Cat === Animal.Cat).toBe(true);
expect(Animal.Cat !== Animal.Dog).toBe(false);
```

- The enum type itself becomes the union of all the values. The values of enums does not overlap another.

```typescript
function f(animal: Animal): void {
  // Produces type error:
  // This condition will always return 'false' since the types 'Animal.Cat' and 'Animal.Dog' have no overlap.
  if (animal.is(Animal.Cat) && animal.is(Animal.Dog)) {
    ...
  }
}

function g(animal: Animal): void {
  switch (animal) {
    case Animal.Bird:
      ...
      break
    case Animal.Cat:
      ...
      break
    case Aniaml.Dog:
      ...
      break
    default:
      // TypeScript compiler detects it is unreachable here
}
```

- Reverse mapping of values to keys are preserved.

In native `enum`s, reverse mapping from the values to the keys is supported:

```typescript
enum Animal{
  Cat,
  Dog,
}

expect(Animal[Animal.Cat]).toBe('Cat');
expect(Animal[Aniaml.Dog]).toBe('Dog');
```

`extend`ed enum is not an indexable type (in JS, only `number`, `string`, `symbol` types can be used to index an object). Thus, `extend`ed enum provides a similar indexing method to access keys from the values.

```typescript
enum _Animal { Cat, Dog }

class Animal extends extend<typeof _Animal, _Animal>(_Animal) {}

/* use "keyOf" method to access keys */
expect(Animal.keyOf(Animal.Cat)).toBe('Cat');
expect(Animal.keyOf(Animal.Dog)).toBe('Dog');
```

### Serialization and Deserialization

`from` provides a way to parse a primitive value (`string` or `number`) into one of the enumerated value.

It is safely typed, so if the given primitive does not match one of the defined primitive, it returns `undefined`.

```typescript
expect(Animal.from(0)).toBe(Animal.Bird);
expect(Animal.from(1)).toBe(Animal.Cat);

// an undefined primitive
expect(Animal.from(-1)).toBe(undefined);
```

Or, parse using the fallback value:

```typescript
expect(Animal.from(-1, Animal.Dog)).toBe(Animal.Dog);
```

### Iterations

`extend`ed enumerations provide iterables of defined keys and values.

```typescript
for (const animal of Animal) {
  // animal := Animal.Bird, Animal.Cat, Animal.Dog in each loop 
}

for (const key of Animal.keys()) {
  // key := 'Bird', 'Cat', 'Dog' in each loop
}

expect([...Animal.entries()])
  .toEqual([
    [ 'Bird', Animal.Bird ],
    [ 'Cat',  Animal.Cat  ],
    [ 'Dog',  Animal.Dog  ],
  ]);
```

### Matches

`extend`ed enumerations provide a default method named `is`. `is` is aware of the primitives defining the enumeration.

```typescript
enum _Fruit {
  Apple = 'APPLE',
  Orange = 'ORANGE',
}
const Fruit = extend<typeof _Fruit, Fruit>(Fruit);

// compare using values
expect(Fruit.Apple.is(Fruit.Apple)).toBe(true);
expect(Fruit.Apple.is(Fruit.Orange)).toBe(false);

// compare using primitives
expect(Fruit.Apple.is('APPLE')).toBe(true);
expect(Fruit.Apple.is('apple')).toBe(false);
expect(Fruit.Apple.is('ORANGE')).toBe(false);
```

> WIP (coming in v0.3.0)

Methods for pattern matching is also provided: `match`.

```typescript
declare const fruit: Fruit;

// match using values
fruit.match({
  APPLE: 0,
  ORANGE: 1,
});

// match using keys
fruit.match({
  Apple: 0,
  Orange: 1, 
});

// extended enum values are objects,
// so it cannot be used as object keys.
// hence, defining each case as tuple is provided.
fruit.match([
  [Fruit.Apple, 0],
  [Fruit.Orange, 1],
])
```

### Inheriting extended enumerations

> WIP (coming in v0.4.0)

Further extending default extended enumeration class is also possible. You may add more querying methods (modifying internal state of the instance is not encouraged), or override existing core methods such as `is` or `from` to customize the default behavior.

```typescript
// you may add more querying methods to extend enumerations
class Pets extends extend<typeof _Animal, _Animal>(_Animal) {

  get walks(): boolean {
    return this.is.not(Pets.Bird);
  }

}
```

## API Documentation

> WIP

## Contribution

> WIP

## LICENSE

See [LICENSE](https://github.com/inhibitor1217/extended-enum/blob/master/LICENSE).
