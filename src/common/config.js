const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const package = require('../../package.json');

const liminoid = require('liminoid-mdx');

const babelOpt = {
  sourceType: 'module',
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 2,
        useBuiltIns: 'usage',
        targets: { esmodules: true },
      },
    ],
    '@babel/react',
  ],
};

const rules = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: babelOpt,
      },
    },
    {
      test: /\.mdx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOpt,
        },
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [liminoid],
          },
        },
      ],
    },
  ],
};

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    inject: false,
    templateContent: ({ htmlWebpackPlugin }) => `
    <!doctype html>
    <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" href="https://liminoid.io/images/favicon.gif" />
          <title>Hello Liminoid!</title>
          ${htmlWebpackPlugin.tags.headTags}
        </head>
        <body>
          <noscript>It looks like
            <strong>JavaScript has been disabled on your browser</strong>, please
            <strong>enable JS</strong> to make this application work.</noscript>

          <div id="root"></div>
          ${htmlWebpackPlugin.tags.bodyTags}
        </body>
      </html>
    `,
  }),
];

exports.development = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: plugins,
  module: rules,
};

exports.production = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    usedExports: true,
  },
  plugins: plugins,
  module: rules,
};

exports.devServer = {
  clientLogLevel: 'info',
  stats: 'errors-warnings',
  liveReload: false,
  serveIndex: true,
  open: false,
};

exports.liminoid = `
module.exports = {
  liminoid: '${package.version}',
  node: '${process.version}',
  webpack: '${webpack.version}',
};`.trim();
