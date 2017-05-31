let path = require('path');
let webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
  'webpack-hot-middleware/client?reload=true',
   path.join(__dirname,'client/index.js')
  ],
  output:{
    path:'/',
    filename: 'bundle.js',
    publicPath:'/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test:/\.js$/,
        include:path.join(__dirname,'client'),
        loaders: ['babel-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.svg$|\.png$/i,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  }
}
