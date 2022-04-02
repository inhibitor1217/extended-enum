---
sidebar_position: 1
---

# Parsing

## `from`

`from` is a utility to parse a primitive value (`string` or `number`) into a enumerated value.

`from` is safely typed. If the given primitive value was not able to be parsed, `from` will return `undefined`. Otherwise, a default value could be given to `from` to handle such case.

```ts
enum _LogLevel {
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
}
class LogLevel extends extend<typeof _LogLevel, _LogLevel>(_LogLevel) {}

// USAGE
const level0 = LogLevel.from('INFO');                // LogLevel.Info
const level1 = LogLevel.from('FOO');                 // undefined
const level2 = LogLevel.from('FOO', LogLevel.Error); // LogLevel.Error
```
