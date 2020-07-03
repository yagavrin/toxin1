const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const fs = require('fs')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
}

const PAGES_DIR = `${PATHS.src}/pages`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

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
        exclude: '/node_modules/',
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
        exclude: [path.resolve(__dirname, "/src/components/fonts")],
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
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
                  path: 'postcss.config.js'
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
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    })),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.pug`,
      filename: 'index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/UI-kit/colors-and-types/colors-and-types.pug`,
      filename: 'colors-and-types.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/UI-kit/form-elements/form-elements.pug`,
      filename: 'form-elements.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/UI-kit/headers-and-footers/headers-and-footers.pug`,
      filename: 'headers-and-footers.html',
      inject: true
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