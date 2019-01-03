const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

dotenv.config();

// Ref: https://github.com/lorenwest/node-config/wiki/Environment-Variables
// This will detect ./config/*** folder, it's a nodejs mechanism
const mode = process.env.NODE_ENV || 'development';

const uiConfig = {
  // `development|production`, such as minify output, etc, it will set to `process.env.NODE_ENV`
  mode,
  entry: {
    dist: [
      './src/frontend/index.es6.jsx', // this is multiple entrypoint combined with gulp.src
    ],
  },
  output: {
    filename: 'app.[name].js',
    // path: path.resolve(__dirname, 'src/backend'),  // this is replaced by gulp
  },
  target: 'web',
  // Because we need this module to mix in our entrypoint of dist.
  // externals: [
  //   nodeExternals({whitelist: ['webpack/hot/poll?1000']}),
  // ],
  devtool: 'source-map',
  // for enable/disabled --watch for webpack for re-compile,
  // also it can could be integrated with HMR to work smoothly below plugins.
  watch: false,
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
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          'css-loader', // translates CSS into CommonJS
          // 'postcss-loader', // for compatible css prefixer support for most browser
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
      // Both options are optional if you won't to customize.
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

if (uiConfig.mode === 'development') {
  uiConfig.watch = true;
}

// in gulpfile multiple config of webpack will cause HMR working incorrectly.
module.exports = uiConfig;
