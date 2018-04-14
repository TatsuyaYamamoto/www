const {resolve} = require("path");

const config = {
  entry: {
    index: "./src/index.js",
    activity: "./src/activity.js",
    game: "./src/game.js",
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].bundle.css',
            },
          },
          {loader: 'extract-loader'},
          {
            loader: 'css-loader',
            options: {
              root: '.'
            }
          },
          {loader: "resolve-url-loader"},
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                resolve(__dirname, 'node_modules')
              ],
              sourceMap: true, // Require to resolve relative url in css.
            }
          },
        ]
      },
      {
        test: /\.(woff|jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              useRelativePath: true,
              emitFile: false,
            }
          }
        ]
      },
    ]
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial",
    }
  },
  devServer: {
    contentBase: resolve(__dirname, "dist"),
  }
};

module.exports = config;