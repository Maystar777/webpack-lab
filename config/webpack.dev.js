const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  //配置webpack-dev-server
  // 1. 安装webpack-dev-server：npm install webpack-dev-server --save-dev
  // 2. 在package.json中添加 scripts： "dev": "webpack-dev-server",
  // 3. 在webpack.config.js中添加devServer配置
  //webpack-dev-server的作用：
  // 1. 令Webpack进行模块打包，并处理打包结果的资源请求。
  // 2. 作为普通的Web Server，处理静态资源文件请求。
  //webpack-dev-server的特点：
  // 1. 仅在内存中编译打包，不会生成实际的文件
  //    (这一点可以通过删除工程中的dist目录来验证，刷新页面后功能仍然是正常的。)。
  //    好处是提升效率、不生成实际文件可以避免产生大量无用文件。
  // 2. 支持热更新。和HMR的区别是，HMR可以做到不刷新页面就更新，但是webpack-dev-server不能。
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist') // static配置项用于配置静态资源的路径
    }
  },

  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false // 是否自动打开报告
    }) // 打包分析
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader', //在开发模式下使用 style-loader, 会将样式插入到页面的 <style> 标签中, 支持热更新，便于调试
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
})
