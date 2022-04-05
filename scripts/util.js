const glob = require('glob');

const searchFiles = (pattern) => new Promise((resolve, reject) => {
  glob(pattern, (err, files) => {
    if (err) reject(err);
    else resolve(files);
  });
});

module.exports = {
  searchFiles,
}
