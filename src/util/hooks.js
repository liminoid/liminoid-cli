// if not running in a subprocess just log to console
process.send =
  process.send ||
  function send(obj) {
    console.log(obj);
  };

exports.attach = function attach(compiler) {
  compiler.hooks.compile.tap('Liminoid', compilationParams => {
    process.send({ action: 'compile', value: compilationParams });
  });

  // eslint-disable-next-line no-unused-vars
  compiler.hooks.emit.tap('Liminoid', compilation => {
    process.send({ action: 'emit', value: null });
  });

  // eslint-disable-next-line no-unused-vars
  compiler.hooks.afterEmit.tap('Liminoid', compilation => {
    process.send({ action: 'afterEmit', value: null });
  });

  compiler.hooks.assetEmitted.tap(
    'Liminoid',
    (file, { content, source, outputPath, compilation, targetPath }) => {
      process.send({
        action: 'assetEmitted',
        value: {
          file,
          content,
          source,
          outputPath,
          compilation,
          targetPath
        }
      });
    }
  );

  compiler.hooks.done.tap('Liminoid', stats => {
    const {
      version,
      hash,
      time,
      builtAt,
      outputPath,
      assets,
      entrypoints
    } = stats.toJson();

    process.send({
      action: 'done',
      value: {
        version,
        hash,
        time,
        builtAt,
        outputPath,
        assets,
        entrypoints
      }
    });
  });

  compiler.hooks.failed.tap('Liminoid', error => {
    process.send({ action: 'failed', value: error });
  });

  return compiler;
};

/* eslint-disable no-unused-vars */
function extraHooks(compiler) {
  compiler.hooks.entryOption.tap('Liminoid', (context, entry) => {
    console.log('entryOption');
  });

  compiler.hooks.afterPlugins.tap('Liminoid', compilerCb => {
    console.log('afterPlugins');
  });

  compiler.hooks.afterResolvers.tap('Liminoid', compilerCb => {
    console.log('afterResolvers');
  });

  compiler.hooks.environment.tap('Liminoid', () => {
    console.log('environment');
  });

  compiler.hooks.afterEnvironment.tap('Liminoid', () => {
    console.log('afterEnvironment');
  });

  compiler.hooks.beforeRun.tap('Liminoid', compilerCb => {
    console.log('beforeRun');
  });

  compiler.hooks.run.tap('Liminoid', compilerCb => {
    console.log('run');
  });

  compiler.hooks.thisCompilation.tap(
    'Liminoid',
    (compilation, compilationParams) => {
      console.log('thisCompilation');
    }
  );

  compiler.hooks.compilation.tap(
    'Liminoid',
    (compilation, compilationParams) => {
      console.log('compilation');
    }
  );

  compiler.hooks.make.tap('Liminoid', compilation => {
    console.log('make');
  });

  compiler.hooks.afterCompile.tap('Liminoid', compilation => {
    console.log('afterCompile');
  });

  return compiler;
}
/* eslint-enable no-unused-vars */
