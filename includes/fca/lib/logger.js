const chalk = require('chalk');
const { selectedTheme, co, error } = require('../../../utils/colors');

module.exports = (text, type) => {
  switch (type) {
    case "warn":
      process.stderr.write(co(`\r[ FWARN ] > ${text}`) + '\n');
      break;
    case "error":
      process.stderr.write(chalk.bold.hex("#ff0000").bold(`\r[ ERROR ]`) + ` > ${text}` + '\n');
      break;
    case "info":
      process.stderr.write(chalk.bold(co(`\r[ FCA ] > ${text}`) + '\n'));
      break;
    default:
      process.stderr.write(chalk.bold(co(`\r${String(type).toUpperCase()} ${text}`) + '\n'));
      break;
  }
};