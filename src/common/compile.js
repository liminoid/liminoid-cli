const ora = require('ora');
const chalk = require('chalk');

const { Msg } = require('./format');

exports.compile = function compile(input, webpack, options, callback) {
  const spinner = ora('Gathering tools 🧰').start();

  const state = { port: options.port };
  webpack.on('message', (m) => {
    switch (m.action) {
      case 'port':
        state.port = m.value;
        break;
      case 'error':
        if (spinner && spinner.isSpinning) {
          spinner.fail();
        }
        throw new Error(Msg.error(m.value));
      case 'warning':
        console.log(Msg.warn(m.value));
        break;
      case 'compile':
        // eslint-disable-next-line no-unused-expressions
        spinner &&
          spinner
            .succeed()
            .start(
              chalk`Starting construction at {rgb(255, 121, 198) ${input}} 🏗`
            );
        break;
      case 'emit':
        // eslint-disable-next-line no-unused-expressions
        spinner && spinner.succeed();
        break;
      case 'assetEmitted':
        // eslint-disable-next-line no-unused-expressions
        spinner && spinner.succeed(`${m.value.file} built 💾`);
        break;
      case 'afterEmit':
        // eslint-disable-next-line no-unused-expressions
        spinner && spinner.succeed(`Bundle ready 📦`);
        break;
      case 'done':
        // eslint-disable-next-line no-unused-expressions
        spinner &&
          spinner.succeed(
            `Build completed in ${m.value.time / 1000} seconds 🚀`
          );

        callback(state, m);
        break;
      default:
        console.log(Msg.warn(m.action));
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

  process.on('exit', function exit() {
    if (spinner && spinner.isSpinning) {
      spinner.fail();
    }
    if (webpack) {
      webpack.kill();
    }
  });
};
