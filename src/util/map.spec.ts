import {
  map,
  pipe,
} from '@fxts/core';
import { toEntry } from './map';

describe('toEntry', () => {
  it('maps key into entry using given mapper function', () => {
    const square = (a: number) => a * a;
    const squaredEntry = toEntry(square);
    expect(squaredEntry(1)).toEqual([1, 1]);
    expect(squaredEntry(4)).toEqual([4, 16]);

    const lowercase = (a: string) => a.toLowerCase();
    const lowercasedEntry = toEntry(lowercase);
    expect(lowercasedEntry('FOO')).toEqual(['FOO', 'foo']);
    expect(lowercasedEntry('Hello, World!')).toEqual(['Hello, World!', 'hello, world!']);
  });

  it('can be used to create mappings easily', () => {
    const uppercase = (a: string) => a.toUpperCase();

    const keys = ['foo', 'bar', 'baz'];
    expect(Object.fromEntries(pipe(keys, map(toEntry(uppercase)))))
      .toEqual({
        foo: 'FOO',
        bar: 'BAR',
        baz: 'BAZ',
      });
  });
});
