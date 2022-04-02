---
sidebar_position: 2
---

# Iteration

## `[Symbol.iterator]()`

`extend`ed enum **itself is an ES6 iterable**. Iteration through the values is possible with `for .. of` syntax, spread operator, or via similar methods. The values are iterated by its definition order.

```ts
enum _Fruit {
  Apple = 'apple',
  Orange = 'orange',
  Pear = 'pear',
  Strawberry = 'strawberry',
}
class Fruit extends extend<typeof _Fruit, _Fruit>(_Fruit) {}

// USAGE

/**
 * Prints:
 * "apple"
 * "orange"
 * "pear"
 * "strawberry"
 */
for (const fruit of Fruit) {
  console.log(fruit.toString());
}

// [Fruit.Apple, Fruit.Orange, Fruit.Pear, Fruit.Strawberry]
const fruits = [...Fruit];
```

## `values()`

An alias of `[Symbol.iterator()]`.

```ts
// [Fruit.Apple, Fruit.Orange, Fruit.Pear, Fruit.Strawberry]
const fruits = [...Fruit.values()];
```

## `keys()`

Returns an ES6 iterable which iterates through the keys of the enum.

```ts
// ["Apple", "Orange", "Pear", "Strawberry"]
const fruitKeys = [...Fruit.keys()];
```

## `entries()`

Returns an ES6 iterable which iterates through each tuple `[key, value]` of the enum.

```ts
/**
 * [
 *  ["Apple",      Fruit.Apple],
 *  ["Orange",     Fruit.Orange],
 *  ["Pear",       Fruit.Pear],
 *  ["Strawberry", Fruit.Strawberry],
 * ]
 */
const entries = [...Fruit.entries()];
```
