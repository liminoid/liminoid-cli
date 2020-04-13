const { develop } = require('../../src/handlers/develop');

exports.command = 'develop';
exports.desc = 'Start development server.';
exports.builder = {
  entry: {
    alias: 'i',
    default: './src/index.js',
    describe: 'Input entry point.',
    type: 'string',
  },
  port: {
    alias: 'p',
    default: 8765,
    describe: 'Port to listen on.',
    type: 'number',
  },
  verbose: {
    alias: 'v',
    default: false,
    describe: 'Display internal dev server logs.',
    type: 'boolean',
  },
  hot: {
    default: true,
    describe: 'Hot module replacement. [--no-hot]',
    type: 'boolean',
  },
};

exports.handler = async function (argv) {
  develop(argv.entry, {
    port: argv.port,
    verbose: argv.verbose,
    hot: argv.hot,
  });
};
