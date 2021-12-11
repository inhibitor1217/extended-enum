import {
  map,
  pipe,
} from '@fxts/core';
import {
  mapKeys,
  toEntry,
} from './map';

describe('toEntry', () => {
  it('maps key into entry using given mapper function', () => {
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

describe('mapKeys', () => {
  it('maps keys using given mapper function', () => {
    const mappings = {
      hello: 'world',
      lorem: 'ipsum',
    };

    const fn = (key: keyof typeof mappings) => mappings[key];

    const obj = { hello: 'foo' };

    expect(mapKeys(fn)(obj)).toEqual({ world: 'foo' });
  });
});
