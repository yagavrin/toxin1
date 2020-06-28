const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
            }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './img/'
              }
            }
          ]
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          use: [
            {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './fonts/',
            }
          }
        ]
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract(
              {
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
            }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.pug',
        }),
    new ExtractTextPlugin({filename: 'style.css'}),
    
  ]
}