const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    // 在没有将 index.html 文件打包到 dist 文件夹中的时候
    // 使用 publicPath 之后，以后文件中只要涉及到 url 相关的文件，都会在查找打包后的文件的路径中加上 'dist/'
    // publicPath: 'dist/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: true,
      favicon: './src/favicon.ico',  //favicon路径
      // favicon: path.join(__dirname, './src/favicon.ico')
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      {
        test: /\.(jpg|gif|jpeg|png|bmp)$/,
        use: 'url-loader',
      },
      {
        test: /\.ico$/,
        use: 'url-loader',
      },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.styl(us)?$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.js',
    },
  },
  // devtool: 'inline-source-map', // 加上对应的配置
  // webpack配置提供了devtool这个选项，如果设置为 ‘#source-map’，则可以生成.map文件，在chrome浏览器中调试的时候可以显示源代码。
  devtool: '#source-map',
}
