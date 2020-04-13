const chalk = require('chalk');
const boxen = require('boxen');

exports.Msg = {
  inverse: (input) => chalk`{inverse {rgb(189, 147, 249)  ${input} }}`,
  box: (input) =>
    boxen(input, {
      borderStyle: 'double',
      borderColor: '#bd93f9',
      padding: 2,
      margin: 1,
    }),
  bumper: (symbol, length) => `\n${symbol.repeat(length)}\n`,
  error: (input) => chalk`{bgRed {black ${input}}} 😬`,
  warn: (input) => chalk`{bgYellow {black ${input}}} ⚠️`,
};
