const { build } = require('../../src/handlers/build');

exports.command = 'build';
exports.desc =
  'Compile markdown, MDX, or JSX/React files into a self contained bundle.';
exports.builder = {
  entry: {
    alias: 'i',
    default: './src/index.js',
    describe: 'Input entry point.',
    type: 'string'
  },
  output: {
    alias: 'o',
    default: './build',
    describe: 'Output directory.',
    type: 'string'
  },
  verbose: {
    alias: 'v',
    default: false,
    describe: 'Display internal Webpack build logs.',
    type: 'boolean'
  }
};

exports.handler = function buildCmd(argv) {
  build(argv.entry, argv.output, { verbose: argv.verbose });
};
