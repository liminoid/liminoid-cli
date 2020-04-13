const ora = require('ora');
const chalk = require('chalk');

const { Msg } = require('../common/format');

exports.compile = function (input, webpack, options, callback) {
  const spinner = ora('Gathering tools 🧰').start();

  webpack.on('message', (m) => {
    switch (m.action) {
      case 'port':
        webpack.port = m.value;
        break;
      case 'error':
        if (spinner && spinner.isSpinning) {
          spinner.fail();
        }
        throw new Error(Msg.error(m.value));
      case 'warn':
        console.log(Msg.warn(m.value));
        break;
      case 'compile':
        spinner &&
          spinner
            .succeed()
            .start(
              chalk`Starting construction at {rgb(255, 121, 198) ${input}} 🏗`
            );
        break;
      case 'emit':
        spinner && spinner.succeed();
        break;
      case 'assetEmitted':
        spinner && spinner.succeed(`${m.value.file} built 💾`);
        break;
      case 'afterEmit':
        spinner && spinner.succeed(`Bundle ready 📦`);
        break;
      case 'done':
        spinner &&
          spinner.succeed(
            `Build completed in ${m.value.time / 1000} seconds 🚀`
          );

        callback(webpack, m);
        break;
    }
  });

  webpack.stdout.on('data', (data) => {
    if (options.verbose) {
      console.log(data.toString());
    }
  });

  webpack.stderr.on('data', (error) => {
    if (spinner && spinner.isSpinning) {
      spinner.fail();
    }
    webpack.kill();
    throw new Error(Msg.error(error));
  });

  webpack.on('exit', (code) => {
    if (spinner && spinner.isSpinning) {
      spinner.fail();
    }

    if (code) {
      console.log(`Server shutdown error: ${code}`);
      webpack.kill();
    }
  });

  process.on('exit', function () {
    if (spinner && spinner.isSpinning) {
      spinner.fail();
    }
    if (webpack) {
      webpack.kill();
    }
  });
};
