const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  //context配置项用于配置entry的上下文，即entry的路径是相对于context的。
  //默认值是当前工程目录，一般不需要配置。
  //设置 context 后，所有的模块路径将相对于 context 进行解析。因此需要修改HtmlWebpackPlugin的template路径。
  // context: path.resolve(__dirname, 'src'),
  mode: 'none',
  context: path.join(__dirname, '../'),

  entry: {
    main: './src/index.js',
    another: './src/another.js'
  },
  output: {
    //关于path：
    // 1. 是目录，不是文件
    // 2. 需要绝对路径，所以要拼接
    // 3. __dirname是nodejs的全局变量，表示当前文件所在目录
    // 4. path.resolve()：用于解析绝对路径，始终基于当前工作目录（__dirname可以省略）。
    // 5. path.join()：用于路径拼接，不关心最终是否是绝对路径。
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    clean: true // 清理输出目录
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App', // 自定义标题
      template: './index.html', // 可选：使用自定义模板
      filename: 'index.html', // 输出的 HTML 文件名
      minify: {
        collapseWhitespace: true, // 压缩 HTML 文件，移除空白字符
        removeComments: true // 移除注释
        // minifyCSS: true, // 压缩内联样式
        // minifyJS: true // 压缩内联脚本
      }
    })
    // new CleanWebpackPlugin(), // 默认清理输出目录 可以直接配置output.clean了，这个插件不需要了
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      // minChunks: 2 // 表示被引用次数大于等于x次的模块会被分割，默认值是1
      cacheGroups: {
        // 提取 react 和 react-dom
        reactVendors: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name(module) {
            // 这里可以自定义 vendors 块的名称，例如 'vendors' 或 'vendor~<模块名>'
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]
            return `vendors~${packageName.replace('@', '')}`
          },
          priority: 10, // 设置一个较高的优先级，确保这个组优先被打包
          enforce: true // 强制将这个组打包，即使它的大小小于 minSize
        },
        // 提取其他第三方库，命名为 vendor.js
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          reuseExistingChunk: true // 如果一个模块已经被打包过了，再次打包时会直接引用之前的打包结果
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
