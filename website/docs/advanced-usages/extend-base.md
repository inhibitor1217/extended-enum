---
sidebar_position: 1
---

# Defining additional interfaces

Further extending the class of an `extend`ed enum is also possible.

- Define an interface for additional methods or getters.

```ts
interface IAnimal {
  readonly favorite: boolean;
  walks(): boolean;
  code(prefix: string): string;
}
```

- Provide the interface as **third type paramter** of the `extend` utility.

```ts
enum _Animal { Cat, Dog, Eagle }

class Animal extends extend<typeof _Animal, _Animal, IAnimal>(_Animal) {

}
```

- Implement the attached interface at the `extend`ed class.

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

Now, all the enum values will implement the attached interface.

```ts
Animal.Dog.favorite; // true
Aniaml.Cat.favorite; // false

Animal.Dog.walks();   // true
Animal.Eagle.walks(); // false

Animal.Cat.code('animal'); // "animal:0"
```
