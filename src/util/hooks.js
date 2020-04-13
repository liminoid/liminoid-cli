// if not running in a subprocess just log to console
process.send =
  process.send ||
  function (obj) {
    console.log(obj);
  };

exports.attach = function (compiler) {
  compiler.hooks.compile.tap('Liminoid', (compilationParams) => {
    process.send({ action: 'compile', value: compilationParams });
  });

  compiler.hooks.emit.tap('Liminoid', (compilation) => {
    process.send({ action: 'emit', value: null });
  });

  compiler.hooks.afterEmit.tap('Liminoid', (compilation) => {
    process.send({ action: 'afterEmit', value: null });
  });

  compiler.hooks.assetEmitted.tap(
    'Liminoid',
    (file, { content, source, outputPath, compilation, targetPath }) => {
      process.send({
        action: 'assetEmitted',
        value: {
          file: file,
          content: content,
          source: source,
          outputPath: outputPath,
          compilation: compilation,
          targetPath: targetPath,
        },
      });
    }
  );

  compiler.hooks.done.tap('Liminoid', (stats) => {
    const {
      version,
      hash,
      time,
      builtAt,
      outputPath,
      assets,
      entrypoints,
    } = stats.toJson();

    process.send({
      action: 'done',
      value: {
        version: version,
        hash: hash,
        time: time,
        builtAt: builtAt,
        outputPath: outputPath,
        assets: assets,
        entrypoints: entrypoints,
      },
    });
  });

  compiler.hooks.failed.tap('Liminoid', (error) => {
    process.send({ action: 'failed', value: error });
  });

  return compiler;
};

function extraHooks(compiler) {
  compiler.hooks.entryOption.tap('Liminoid', (context, entry) => {
    console.log('entryOption');
  });

  compiler.hooks.afterPlugins.tap('Liminoid', (compiler) => {
    console.log('afterPlugins');
  });

  compiler.hooks.afterResolvers.tap('Liminoid', (compiler) => {
    console.log('afterResolvers');
  });

  compiler.hooks.environment.tap('Liminoid', () => {
    console.log('environment');
  });

  compiler.hooks.afterEnvironment.tap('Liminoid', () => {
    console.log('afterEnvironment');
  });

  compiler.hooks.beforeRun.tap('Liminoid', (compiler) => {
    console.log('beforeRun');
  });

  compiler.hooks.run.tap('Liminoid', (compiler) => {
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

  compiler.hooks.make.tap('Liminoid', (compilation) => {
    console.log('make');
  });

  compiler.hooks.afterCompile.tap('Liminoid', (compilation) => {
    console.log('afterCompile');
  });

  return compiler;
}
