const path = require('path');
const { merge } = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

// Create patterns for CopyPlugin
const patterns = ['fonts', 'images', 'plugins'].map((item) => {
  const obj = {
    from: path.resolve('.', `src/${item}`),
    to: `./${item}`,
    noErrorOnMissing: true,
  };
  return obj;
});

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve('.', 'build')],
    }),
    new CopyPlugin({
      patterns,
    }),
  ],
});
