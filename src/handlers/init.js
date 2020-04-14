const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const ora = require('ora');
const chalk = require('chalk');

const packageTemplate = require('../templates/package.json');
const { liminoid: config } = require('../common/config');

const { Msg } = require('../common/format');

// eslint-disable-next-line no-unused-vars
exports.init = function init(name, options) {
  const spinner = ora('Scaffolding new project 🎢').start();

  if (fs.existsSync(path.resolve(name))) {
    throw new TypeError(
      Msg.error(chalk`Directory already exists at {inverse {yellow  ${name} }}`)
    );
  }

  spinner
    .succeed()
    .start(chalk`Creating directory at {rgb(0, 255, 255) ${name} }`);

  fs.mkdirSync(path.resolve(name));

  spinner
    .succeed()
    .start(
      chalk`Creating application template in {rgb(0, 255, 255) ${name}/src }`
    );
  const srcDir = path.join(path.resolve(name), 'src');
  const templateDir = path.join(__dirname, '..', 'templates');

  fs.mkdirSync(srcDir);
  fs.copyFileSync(
    path.join(templateDir, 'index.js'),
    path.join(srcDir, 'index.js')
  );
  fs.copyFileSync(
    path.join(templateDir, 'liminoid.mdx'),
    path.join(srcDir, 'liminoid.mdx')
  );
  fs.copyFileSync(
    path.join(templateDir, 'chart.json'),
    path.join(srcDir, 'chart.json')
  );
  fs.copyFileSync(
    path.join(templateDir, 'theme.js'),
    path.join(srcDir, 'theme.js')
  );

  spinner.succeed().start('Initializing liminoid.config.js');
  fs.writeFileSync(path.join(path.resolve(name), 'liminoid.config.js'), config);

  spinner.succeed().start('Initializing package.json');
  packageTemplate.name = name;
  fs.writeFileSync(
    path.join(path.resolve(name), 'package.json'),
    JSON.stringify(packageTemplate)
  );

  spinner.succeed().start('Installing dependencies');
  // eslint-disable-next-line no-unused-vars
  exec('npm install', { cwd: path.resolve(name) }, (error, stdout, stderr) => {
    if (error) {
      throw new TypeError(Msg.error(error));
    }
    spinner.succeed();

    console.log(
      Msg.box(
        chalk`🌈  {rgb(255, 121, 198) cd} {green ${name}}; {rgb(0, 255, 255) liminoid develop}  🌈`
      )
    );
  });
};
