const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const fs = require('fs');

// Prepare list of CDN plugins in array 'tags'
let tags = [];
const globalPluginList = JSON.parse(
  fs.readFileSync(
    path.resolve('.', 'src/scripts/global-plugin-list.json'),
    'utf8',
  ),
);
tags = globalPluginList.css.concat(globalPluginList.js);

// Prepare plugins
const plugins = [
  new MiniCssExtractPlugin({
    filename: './style/main.css?v=[contenthash]',
  }),
  // This magical plugin will add CSS or JS links from CDN to HTML pages
  new HtmlWebpackTagsPlugin({
    tags,
    append: false,
    usePublicPath: false,
  }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: 'body',
    filename: 'index.html',
    minify: {
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
];

// Create more HtmlWebpackPlugin instances
const dirPath = path.resolve('.', 'src/pages');
let files = [];
if (fs.existsSync(dirPath)) {
  files = fs.readdirSync(dirPath, 'utf8');
  files.forEach((file) => {
    const fileContent = fs.readFileSync(
      path.resolve('.', `src/pages/${file}`),
      'utf8',
    );
    if (fileContent.length) {
      const page = new HtmlWebpackPlugin({
        template: `src/pages/${file}`,
        inject: 'body',
        filename: `pages/${file}`,
        minify: {
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      });
      plugins.push(page);
    }
  });
}

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve('.', 'build'),
    filename: './js/bundle.js?v=[contenthash]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.(s?css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-hot-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'sass-loader',
          'import-glob-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|woff|eot|ttf|woff2)$/,
        type: 'asset/inline',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader', // export HTML as string. HTML is minimized when the compiler demands.
        options: {
          sources: false,
        },
      },
    ],
  },
  plugins,
};
