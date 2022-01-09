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

enum Animal {
  Bird,
  Cat,
  Dog,
}

// use the utility as follows:
class EAnimal extends extend<typeof Animal, Animal>(Animal) {}
```

NOTE: you cannot use `extend` with `const enum`s, which are non-objects in runtime.

## What powers does it have?

### Basic functionalities

`extend`ed enumerations preserves all the functionality of TypeScript `enum`s, such as:

- Reference all the enumerated values using the key. The reference equality is preserved.

```typescript
// access values using keys
const pet = EAnimal.Cat;
const pets = [EAnimal.Dog];

// reference equality is preserved
expect(EAnimal.Cat === EAnimal.Cat).toBe(true);
expect(EAnimal.Cat === EAnimal.Dog).toBe(false);
expect(EAnimal.Cat !== EAnimal.Dog).toBe(true);
```

- The enum type itself becomes the union of all the values. The values of enums does not overlap another.


> The exhaustive typing of union is not supported yet

```typescript
function f(animal: EAnimal): void {
  // Produces type error:
  // This condition will always return 'false' since the types 'EAnimal.Cat' and 'EAnimal.Dog' have no overlap.
  if (animal.is(EAnimal.Cat) && animal.is(EAnimal.Dog)) {
    type T1 = typeof animal; // never
  }
}

function g(animal: EAnimal): void {
  switch (animal) {
    case EAnimal.Bird:
      ...
      break
    case EAnimal.Cat:
      ...
      break
    case EAnimal.Dog:
      ...
      break
    default:
      // TypeScript compiler detects it is unreachable here
      type T2 = typeof animal; // never
}
```

- Reverse mapping of values to keys are preserved.

In native `enum`s, reverse mapping from the values to the keys is supported:

```typescript
enum Animal {
  Cat,
  Dog,
}

expect(Animal[Animal.Cat]).toBe('Cat');
expect(Animal[Aniaml.Dog]).toBe('Dog');
```

`extend`ed enum is not an indexable type (in JS, only `number`, `string`, `symbol` types can be used to index an object). Thus, `extend`ed enum provides a similar indexing method to access keys from the values.

```typescript
enum Animal { Cat, Dog }

class EAnimal extends extend<typeof Animal, Animal>(Animal) {}

/* use "keyOf" method to access keys */
expect(EAnimal.keyOf(EAnimal.Cat)).toBe('Cat');
expect(EAnimal.keyOf(EAnimal.Dog)).toBe('Dog');
```

### Serialization and Deserialization

`from` provides a way to parse a primitive value (`string` or `number`) into one of the enumerated value.

It is safely typed, so if the given primitive does not match one of the defined primitive, it returns `undefined`.

```typescript
expect(EAnimal.from(0)).toBe(EAnimal.Bird);
expect(EAnimal.from(1)).toBe(EAnimal.Cat);

// an undefined primitive
expect(EAnimal.from(-1)).toBe(undefined);
```

Or, parse using the fallback value:

```typescript
expect(EAnimal.from(-1, Animal.Dog)).toBe(EAnimal.Dog);
```

### Iterations

`extend`ed enumerations provide iterables of defined keys and values.

```typescript
for (const animal of EAnimal) {
  // animal := EAnimal.Bird, EAnimal.Cat, EAnimal.Dog in each loop 
}

for (const key of EAnimal.keys()) {
  // key := 'Bird', 'Cat', 'Dog' in each loop
}

expect([...EAnimal.entries()])
  .toEqual([
    [ 'Bird', EAnimal.Bird ],
    [ 'Cat',  EAnimal.Cat  ],
    [ 'Dog',  EAnimal.Dog  ],
  ]);
```

### Matches

`extend`ed enumerations provide a default method named `is`. `is` is aware of the primitives defining the enumeration.

```typescript
enum Fruit {
  Apple = 'APPLE',
  Orange = 'ORANGE',
}
class EFruit extends extend<typeof Fruit, Fruit>(Fruit) {}

// compare using values
expect(EFruit.Apple.is(EFruit.Apple)).toBe(true);
expect(EFruit.Apple.is(EFruit.Orange)).toBe(false);

// compare using primitives
expect(EFruit.Apple.is('APPLE')).toBe(true);
expect(EFruit.Apple.is('apple')).toBe(false);
expect(EFruit.Apple.is('ORANGE')).toBe(false);
```

`match` provides a utility for pattern matching. Specify the mappings as you please (defining patterns with keys, values, primitive values are all supported), then the utility will search for the pattern and return the desired mapping.

Mapping multiple patterns to a single value is also supported (see the last example).

```typescript
declare const fruit: EFruit;

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
  [EFruit.Apple, 0],
  [EFruit.Orange, 1],
  [[EFruit.Apple, EFruit.Orange], 2], // matching multiple patterns to a single value
])
```

### Inheriting extended enumerations

> WIP (coming in v0.4.0)

Further extending default extended enumeration class is also possible. You may add more querying methods (modifying internal state of the instance is not encouraged), or override existing core methods such as `is` or `from` to customize the default behavior.

```typescript
// you may add more querying methods to extend enumerations
class EPets extends extend<typeof Animal, Animal>(Animal) {

  get walks(): boolean {
    return this.isNot(EPets.Bird);
  }

}
```

## API Documentation

> WIP

## Contribution

> WIP

## LICENSE

See [LICENSE](https://github.com/inhibitor1217/extended-enum/blob/master/LICENSE).
