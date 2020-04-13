const { init } = require('../../src/handlers/init');

exports.command = 'new [name]';
exports.desc = 'Scaffold a new Liminoid application.';
exports.builder = {
  name: {
    alias: 'n',
    required: true,
    describe: 'Name for new project.',
    type: 'string',
  },
};

exports.handler = async function (argv) {
  init(argv.name, {});
};
