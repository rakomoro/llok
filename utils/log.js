const chalk = require('chalk');
const gradient = require("gradient-string");
const { selectedTheme, co, error, cra } = require('./colors');

module.exports = (text, type) => {
  switch (type) {
    case "warn":
      process.stderr.write(co(`\r[ ERROR ] > ${text}`) + '\n');
      break;
    case "error":
      process.stderr.write(chalk.bold.hex("#ff0000").bold(`\r[ ERROR ]`) + ` > ${text}` + '\n');
      break;
    default:
      process.stderr.write(chalk.bold(co(`\r${String(type).toUpperCase()} ${text}`) + '\n'));
      break;
  }
};

module.exports.loader = (data, option) => {
  switch (option) {
    case "warn":
      console.log(chalk.bold(co("[ WARNING ] > ")) + co(data))
      break;
    case "error":
      console.log(chalk.bold(co("[ ERROR ] > ")) + chalk.bold(co(data)))
      break;
    default:
      console.log(chalk.bold(co("[ LOADING ] > ")) + chalk.bold(co(data)))
      break;
  }
}

module.exports.load = (data, option) => {
  let coloredData = '';

  switch (option) {
    case 'warn':
      coloredData = (cra || co)('[ LOGIN ] >' + data);
      console.log(chalk.bold(coloredData));
      break;
    case 'error':
      coloredData = chalk.bold.hex('#FF0000')('[ ERROR ] >') + chalk.bold.red(data);
      console.log(coloredData);
      break;
    default:
      coloredData = (cra || co)('[ LOGIN ] >' + data);
      console.log(chalk.bold(coloredData));
      break;
  }
};