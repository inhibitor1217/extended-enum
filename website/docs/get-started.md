---
sidebar_position: 1
---

# Get Started

## Installation

Install the package via `npm` or `yarn`.

```bash
# npm
npm i extended-enum@latest

# yarn
yarn add extended-enum@latest
```

### Peer dependencies

`extended-enum` requires `typescript` with version `4.1.2` or higher.

```bash
# npm
npm i -D typescript@^4.1.2

# yarn
yarn add -D typescript@^4.1.2
```

## TL;DR

Import `extend` magic function from `extended-enum` package. Wrap a TypeScript `enum` with `extend`, using the following syntax.

```ts
import { extend } from 'extended-enum';

enum _Fruit { Apple, Orange, Pear, Strawberry }

// note: ensure to specify the type parameters correctly
class Fruit extends extend<typeof _Fruit, _Fruit>(_Fruit) {}
```

Now, you are good to go!

> ### ⚠️ Warnings
> - You cannot `extend` a `const enum`.

## What should I do next?

If your existing code was using native TypeScript enums, simply `extend`ing them should require no or very little migration. You may use native features from TypeScript enums as they are.

`extend`ed enums do not break the original enum, so your project could choose to migrate into `extend`ed enums gradually.

The magic utility, **`extend` provides additional utilities attached to the native behavior**. Read [Extended Features](/docs/extended-features/parsing) section to explore the benefits.
