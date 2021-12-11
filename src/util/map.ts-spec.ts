import {
  checks,
  equal,
} from '../test/typecheck';
import { entries, fromEntries, mapKeys } from './map';

type Fruit = 'apple' | 'pear' | 'strawberry';
type FruitSalesData = {
  price: number;
  discount: boolean;
};

declare const fruitData: Record<Fruit, FruitSalesData>;
const fruitDataEntries = entries(fruitData);

/* entries */
checks(
  equal<typeof fruitDataEntries, [Fruit, FruitSalesData][]>(),
);

const fruits = fromEntries(fruitDataEntries);

/* fromEntries */
checks(
  equal<typeof fruits, Record<Fruit, FruitSalesData>>(),
);

declare const shops: (fruit: Fruit) => string;
const sales = mapKeys(shops)(fruits);

type Name = 'John' | 'Mindy';
type Surname = 'Smith' | 'Kim';
declare const surname: (name: Name) => Surname;

declare const ages: { John: { age: number } };

const agesOfSurname = mapKeys(surname)(ages);

/* mapKeys */
checks(
  equal<typeof sales, Record<string, FruitSalesData>>(),
  equal<typeof agesOfSurname, Record<Surname, { age: number }>>(),
);
