var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: path.join(__dirname),
  entry: {
    jsx: './lib/index.js',
    html: './lib/index.html',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.less$/,
        include: /styles/,
        loader: "style!css!less"
      },
      {
        test: /\.css$/,
        exclude: /app/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  devServer: {
    contentBase: './lib',
    hot: true
  }
}
