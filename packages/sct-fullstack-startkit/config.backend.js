const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
// const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

dotenv.config();

// Ref: https://github.com/lorenwest/node-config/wiki/Environment-Variables
// This will detect ./config/*** folder, it's a nodejs mechanism
const mode = process.env.NODE_ENV || 'development';

const apiConfig = {
  // `development|production`, such as minify output, etc, it will set to `process.env.NODE_ENV`
  mode,
  entry: {
    dist: [
      './src/backend/index.es6.js', // this is multiple entrypoint combined with gulp.src
    ],
  },
  output: {
    filename: 'app.[name].js',
    // path: path.resolve(__dirname, 'src/backend'), // this is replaced by gulp
  },
  target: 'node',
  // Cancel node_modules excluding rule
  externals: [
  // <-- because we need this module to mix in our entrypoint of dist.
    nodeExternals({ whitelist: ['webpack/hot/poll?1000'] }),
  ],
  devtool: 'source-map', // enable sourcemap for debugging
  // for enable/disabled --watch for webpack for re-compile,
  // also it can could be integrated with HMR to work smoothly below plugins.
  watch: false,
  // For Support Symbol Link in node_modules/**/*
  // Ref: https://webpack.js.org/configuration/resolve/#resolve-symlinks
  // Ref: https://segmentfault.com/a/1190000011100006
  resolve: {
    symlinks: true,
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // transpile using babel-preset-env default settings,
              // such as convert `const` to `var` so on.
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.yaml$/,
        use: 'js-yaml-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // for supporting `import 'xxx'` instead of `import 'xxx.jsx' or 'xxxx.js'`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

if (apiConfig.mode === 'development') {
  apiConfig.watch = true;
  apiConfig.entry.dist.unshift('webpack/hot/poll?1000'); // HMR Hook, it's in `node_modules/webpack/hot/poll.js`
  apiConfig.output = {
    ...apiConfig.output,
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js', // move lots of *.hot-update.js files to `.hot` folder
    hotUpdateMainFilename: '.hot/[hash].hot-update.json', // move lots of *.hot-update.json files to `.hot` folder
  };
  apiConfig.plugins = [
    // BTW config.devServer.hot = { ... }
    // if for devServer of webpack without 'webpack/hot/poll?1000' mixin
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    ...apiConfig.plugins,
  ];
}

// Unresolved: multiple config will cause HMR incorrect.
module.exports = apiConfig;
