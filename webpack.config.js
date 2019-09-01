const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
