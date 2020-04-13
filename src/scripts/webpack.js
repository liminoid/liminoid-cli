const webpack = require('webpack');

const { production: config } = require('../common/config');
const hooks = require('../util/hooks');

const input = process.argv[2];
const output = process.argv[3];
const verbose = process.argv[4];

// if not running in a subprocess just log to console
process.send =
  process.send ||
  function (obj) {
    console.log(obj);
  };

// update config with input and output paths
config.entry = input;
config.output = {
  path: output,
  filename: '[name].bundle.js',
  chunkFilename: '[chunkhash].liminoid.js',
  pathinfo: false,
};
config.stats = verbose === 'true' ? 'normal' : 'errors-warnings';

// attach webpack progress hooks
const compiler = hooks.attach(webpack(config));

// start compilation
compiler.run((err, stats) => {
  if (err) {
    process.send({ action: 'error', value: err.stack || err });
    if (err.details) {
      process.send({ action: 'error', value: err.details });
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    process.send({ action: 'error', value: info.errors });
  }
  if (stats.hasWarnings()) {
    process.send({ action: 'warning', value: info.warnings });
  }
});
