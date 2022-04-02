---
sidebar_position: 2
---

# Basics

`extend` preserves the behavior of native TypeScript enums.

## Accessing values

Retrieve the enumerated values by keys.

The reference equality of retrieved values is preserved.

```ts
const apple = Fruit.Apple;
const orange = Fruit.Orange;

console.log(apple === Fruit.Apple); // true
console.log(apple === orange);      // false
```

## Exclusive typing

The types of the values does not overlap each other.

```ts
type T = typeof Fruit.Apple & typeof Fruit.Orange; // never
```

## Reverse mapping

Native TypeScript enums support **reverse mapping**, which allows us to retrieve keys back from the values.

```ts
enum _Fruit { Apple, Orange, Pear, Strawberry }

console.log(_Fruit[_Fruit.Apple]);  // "Apple"
console.log(_Fruit[_Fruit.Orange]); // "Orange"
```

`extend`ed enum value is an **objects**, so it is not an indexable type in JavaScript. Instead, it provides `keyOf` API to support reverse mapping.

```ts
console.log(Fruit.keyOf(Fruit.Apple));  // "Apple"
console.log(Fruit.keyOf(Fruit.Orange)); // "Orange"
```

## Conversion to primitives

When converted to string via `toString()`, `extend`ed enums have the same behavior with their native form.

```ts
console.log(Fruit.Apple.toString()); // "0"
```

`extend`ed enums also implement `toJSON()`, so JSON serialization is done seamlessly without additional processing.

```ts
const user = {
  id: '42',
  favoriteFruits: [Fruit.Apple, Fruit.Strawberry],
}

console.log(JSON.stringify(user)); // { "id": "42", "favoriteFruits": [0, 3] }
```

### `keyOf`

`keyOf` retrieves the key from the enum value itself.

```ts
Fruit.Apple.keyOf();  // "Apple"
Fruit.Orange.keyOf(); // "Orange"
```

### `valueOf`

`valueOf` retrieves the primitive value from the enum value itself.

```ts
Fruit.Apple.valueOf();  // 0
Fruit.Orange.valueOf(); // 1
```
