const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const env = process.env.NODE_ENV
const devMode = env !== 'production'
const cssLoader = { loader: 'css-loader', options: { importLoaders: 1, minimize: !devMode } }

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/app.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  devtool: devMode ? '#source-map' : false,
  devServer: {
    port: 3001,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      vue$: 'vue/dist/vue.js',
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [path.resolve(__dirname, './src')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          cssLoader,
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
        // options: {
        //   symbolId: 'vm-[name]'
        // }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      // inject: true,
      environment: env
    })
  ]
}