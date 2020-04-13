#!/usr/bin/env node

const chalk = require('chalk');

const epilogue = chalk`\n\n{inverse ^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v}\n
{rgb(139, 233, 253) Docs, examples, chat, contributing, license, etc.} 👉 {rgb(255, 121, 198) {underline https://liminoid.io}}`;

require('yargs')
  .scriptName('liminoid')
  .commandDir('cmds')
  .demandCommand()
  .help('h')
  .alias('h', 'help')
  .epilog(epilogue).argv;
