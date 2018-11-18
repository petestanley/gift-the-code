const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const outputFolder = path.resolve(__dirname, 'public')
module.exports = {
  mode: 'development',
  entry:  path.resolve(__dirname, `ui/index.jsx`),
  output: {
    path: outputFolder,
    filename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: outputFolder,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
      }
    ]
  },

  plugins: [
      new CleanWebpackPlugin([outputFolder]),
      new webpack.HotModuleReplacementPlugin()
    ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
