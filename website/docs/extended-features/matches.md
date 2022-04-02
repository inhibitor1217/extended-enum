---
sidebar_position: 3
---

# Matches

## Equality - `is`

To determine equality between an enum and a primitive, a key, or another enum, use **`is`**,

```ts
enum _Size { small = 'S', medium = 'M', large = 'L' }
class Size extends extend<typeof _Size, _Size>(_Size) {}

// compare with keys
Size.small.is('small');   // true
Size.medium.is('small');  // false
Size.medium.is('medium'); // true

// compare with primitives
Size.small.is('S');      // true
Size.large.is('L');      // true
Size.large.is('M');      // false
Size.large.is('XS');     // false
Size.medium.is(_Size.M); // true

// compare with values
Size.small.is(Size.small); // true

const size = Size.from('L');
size.is(Size.large);       // true
Size.medium.is(size);      // false
```

### `isNot`

A negation of `is`.

```ts
Size.medium.is('small');    // false
Size.medium.isNot('small'); // true

Size.small.is('S');         // true
Size.small.isNot('S');      // false
```

## Pattern Matching - `match`

**`match` provides a utility for pattern matching.** Specify the mappings as you please (defining patterns with keys, values, primitive values are all supported). `match` will search for the pattern and return the desired mapping.

If the value fails to match all the given patterns, `match` will return `undefined`. Otherwise, provide a fallback value as a second parameter.

Mapping multiple patterns to single value is also supported (see the last example).

```ts
const size = Size.from('L');

// define pattern by keys
size.match({
  small:  200,
  medium: 250,
  large:  300,
}); // 300

size.match({ small: false });       // undefined
size.match({ small: false }, true); // true (fallback case)

// define pattern by primitives
size.match({ S: 200, M: 250, L: 300 }); // 300

// define using tuples
size.match([
  [Size.small,  200],
  [Size.medium, 250],
  [Size.large,  300],
]); // 300

size.match([
  [Size.small, false],
  [[Size.medium, Size.large], true],
]); // true
```
