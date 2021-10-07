const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

  entry: './src/app.jsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader','css-loader',"less-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};
