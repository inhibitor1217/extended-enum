---
sidebar_position: 1
---

# Defining additional interfaces

Further extending the `extend`ed class is also possible.

- Define an interface for additional methods or getters.

```ts
interface IAnimal {
  readonly favorite: boolean;
  walks(): boolean;
  code(prefix: string): string;
}
```

- Provide the interface as **third type paramter** when `extend`ing the enum.

```ts
enum _Animal { Cat, Dog, Eagle }

class Animal extends extend<typeof _Animal, _Animal, IAnimal>(_Animal) {

}
```

- Implement the attached interface.

```ts
class Animal extends extend<typeof _Animal, _Animal, IAnimal>(_Animal) {

  get favorite(): boolean {
    return this.is(Animal.Dog);
  }

  walks(): boolean {
    return this.isNot(Animal.Eagle);
  }

  code(prefix: string): string {
    return `${prefix}:${this.toString()}`;
  }

}
```
