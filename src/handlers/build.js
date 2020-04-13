const path = require('path');
const { fork } = require('child_process');
const chalk = require('chalk');

const { Msg } = require('../common/format');
const { compile } = require('../common/compile');

exports.build = function (input, output, options) {
  const webpack = fork(
    path.join(__dirname, '..', 'scripts', 'webpack.js'),
    [
      path.resolve(input),
      path.resolve(output),
      options.verbose ? 'true' : 'false',
    ],
    { stdio: 'pipe' }
  );

  compile(input, webpack, options, (webpack, m) => {
    console.log(
      Msg.box(
        chalk`🎁  {rgb(0, 255, 255) Open} {rgb(255, 121, 198) ${output}/index.html}  🎁`
      )
    );
  });
};
