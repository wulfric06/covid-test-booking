const pug = require('pug');

module.exports = {
  renderFile: (filePath, options = {}) => new Promise((resolve, reject) => {
    pug.renderFile(filePath, options, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  })
};
