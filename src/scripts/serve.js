const webpack = require('webpack');
const devServer = require('webpack-dev-server');

const { development: config, devServer: dev } = require('../common/config');
const hooks = require('../util/hooks');

const input = process.argv[2];
const port = parseInt(process.argv[3]);
const verbose = process.argv[4];
const hot = process.argv[5];

// if not running in a subprocess just log to console
process.send =
  process.send ||
  function (obj) {
    console.log(obj);
  };

// webpack configuration
config.entry = input;

// devServer configuration
dev.port = port;

if (verbose === 'true') {
  dev.clientLogLevel = 'debug';
  dev.stats = 'normal';
}

if (hot === 'true') {
  dev.hot = true;
} else {
  dev.hot = false;
  dev.liveReload = true;
}

const server = new devServer(hooks.attach(webpack(config)), dev);

server.listen(port, '127.0.0.1').on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    server.listen(0, '127.0.0.1', () => {
      process.send({
        action: 'port',
        value: server.listeningApp.address().port,
      });
    });
  } else {
    throw err;
  }
});
