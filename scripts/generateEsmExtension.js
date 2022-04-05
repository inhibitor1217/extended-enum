/**
 * https://github.com/marpple/FxTS/blob/main/build/generateExtensions.ts
 */

const { readFile, writeFile } = require('fs/promises');
const { searchFiles } = require('./util');

const ESM_ROOT_DIR = `dist/mjs`;

async function main() {
  const files = await searchFiles(`${ESM_ROOT_DIR}/**/*.js`);

  files
    .map((path) => [path, readFile(path)])
    .map(async ([name, filePromise]) => [
      name,
      String(await filePromise),
    ])
    .map(async (promise) => {
      const [path, file] = await promise;
      const importRegex = /import [\w,{}\s\n_*]+ from '[\w,{}\s\n./_]+';/gi;
      const exportRegex = /export [\w,{}\s\n_*]+ from '[\w,{}\s\n./_]+';/gi;
      const statements = (file.match(importRegex) || [])
        .concat(file.match(exportRegex) || []);

      let acc = file;
      if (statements.length > 0) {
        for (const statement of statements) {
          const { length } = statement;
          acc = acc.replace(
            statement,
            statement.substring(0, length - 2) + '.js\';',
          );
        }
      }

      return writeFile(path, acc);
    })
    .reduce((acc, item) => acc.then(() => item));
}

main();
