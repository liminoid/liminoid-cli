const path = require('path');
const { fork } = require('child_process');
const chalk = require('chalk');

const { Msg } = require('../common/format');
const { compile } = require('../common/compile');

exports.develop = function develop(input, options) {
  const devServer = fork(
    path.join(__dirname, '..', 'scripts', 'serve.js'),
    [
      path.resolve(input),
      options.port,
      options.verbose ? 'true' : 'false',
      options.hot ? 'true' : 'false'
    ],
    { stdio: 'pipe' }
  );

  devServer.port = options.port;

  // eslint-disable-next-line no-unused-vars
  compile(input, devServer, options, (webpack, m) => {
    console.log(
      Msg.box(
        chalk`👂  {rgb(0, 255, 255) All ears at} {rgb(255, 121, 198) http://localhost:${webpack.port}}  👂`
      )
    );
  });
};
