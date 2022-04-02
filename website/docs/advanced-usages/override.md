---
sidebar_position: 2
---

# Overriding default behaviors

## Motivation

Extended features - `is`, `from`, etc - determine the equality of the primitive and the enum by its native definition. In the following example, values in enum `_Priority` are defined by the corresponding number primitives, `300`, `200`, and `100`.

```ts
enum _Priority { High = 300, Medium = 200, Low = 100 }
class Priority extends extend<typeof _Priority, _Priority>(_Priority) {}

Priority.High.is(300);   // true
Priority.Medium.is(200); // true
```

However, in some cases, you would want other values to be regarded as a valid primitive for this enum.

- What if the priority should be defined by ranges, `[0, 100], [101, 200], [201, 300]`?
- What if string values `"low", "medium", "high"` should be also parsed to `Priority` enum?

```ts
Priority.High.is(250); // expected: true
Priority.from(42);     // expected: Priority.Low

Priority.from('low');  // expected: Priority.Low
Priority.High
  .match({
    low: true,
    medium: true,
    high: false,
  });                  // expected: false
```

To meet the additional needs for overriding the default behavior, `extend`ed enums expose an interface `eq`.

## `eq`

`eq` determines the equality of the given primitive value and the defined value. It governs the comparison performed in `extend`ed enums, such as in `from`, `is`, or `match`.

**Using this method directly in usecases is not recommended.** `is` or `isNot` are perhaps the methods you are looking for.

In default behavior, `eq` does the reference equality comparison (`===`). Overriding this method will alter the core behavior, granting new possibilities. (See the example.)

In the following example, the case-insensitive comparison overrides the default comparison, as specified at overrided method `eq`. Observe how the behaviors of `from`, `is`, or `match` differ from the original behaviors.

```ts
enum _Level { Low = 'LOW', High = 'HIGH' }

class Level extends extend<typeof _Level, _Level>(_Level) {

  eq(other: string) {
    return this.valueOf().toLowerCase() === other.toLowerCase();
  }

}

Level.Low.is('low')                  // true
Level.from('high')                   // Level.High
Level.Low.match({ low: 0, high: 1 }) // 0
```

### Signature

```ts
  /**
   * @param other The primitive value to compare with.
   * @returns Whether given value is "equal" to this instance.
   * This "equality" can be freely defined in advanced usage.
   */
  eq(other: string | number): boolean;
```
