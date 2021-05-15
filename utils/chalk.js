/* eslint-disable no-console */
const chalk = require('chalk');

module.exports = {

  /**
   * Log the error in the console
  */
  error: (message, obj) => {
    console.log(chalk`{red.bold Oops..!} {white.bgRed.bold ${message}}`);
    if (typeof obj !== 'undefined') {
      console.log(obj);
    }
  },

  /**
   * Log the info in the console
  */
  info: (message, obj) => {
    console.log(chalk.black.bgCyanBright(message));
    if (typeof obj !== 'undefined') {
      console.log(obj);
    }
  }

};
