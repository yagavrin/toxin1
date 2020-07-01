const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 


const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
}

module.exports = {

  externals: {
    path: PATHS
  },
  entry: {
    main: ['@babel/polyfill', PATHS.src],
  },
  output: {
    path: PATHS.dist,
    filename: '[hash].[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70
              }
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true}
            },
            {
              loader: 'postcss-loader',
              options: 
              { 
                sourceMap: true, 
                config: {
                  path: 'src/postcss.config.js'
                } 
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true}
            },
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.pug`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/favicon.ico`,
          to: PATHS.dist
        }
      ]
    }),
    new ExtractTextPlugin({
      filename: '[hash].[name].css'
    }),
  ]
}