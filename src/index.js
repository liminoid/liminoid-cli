const chalk = require('chalk');
const { Msg } = require('./common/format');

throw new Error(
  Msg.error(
    chalk`{bgYellow {black  liminoid-cli }} is only usable as a command line script for now. Please use {bgRgb(0, 255, 255) {black  liminoid new [name] }} to get started `
  )
);
