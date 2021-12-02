import { Keys } from './type';
import {
  checks,
  equal,
  extend,
  Fail,
} from './test/typecheck';

enum Fruit {
  Apple = 'apple',
  Pear = 'pear',
  Strawberry = 'strawberry',
}

enum Animal {
  Cat,
  Dog,
  Elephant,
  Fox,
}

enum Os {
  Windows,
  MacOS,
  iOS = 'iOS',
  Android = 'android',
}

enum Empty {}

/* Keys */
checks(
  equal<Keys<typeof Fruit>, 'Apple' | 'Pear' | 'Strawberry'>(),
  equal<Keys<typeof Animal>, 'Cat' | 'Dog' | 'Elephant' | 'Fox'>(),
  equal<Keys<typeof Os>, 'Windows' | 'MacOS' | 'iOS' | 'Android'>(),

  equal<Keys<typeof Fruit>, 'Apple' | 'Orange', Fail>(),
  equal<Keys<typeof Os>, 'IE' | 'Chrome' | 'Safari', Fail>(),

  extend<Keys<typeof Fruit>, string>(),
  extend<Keys<typeof Animal>, string>(),

  equal<Keys<typeof Empty>, never>(),
);
