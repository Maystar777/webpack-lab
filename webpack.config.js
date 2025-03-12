const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    //关于path：
    // 1. 是目录，不是文件
    // 2. 需要绝对路径，所以要拼接
    // 3. __dirname是nodejs的全局变量，表示当前文件所在目录
    // 4. path.resolve()：用于解析绝对路径，始终基于当前工作目录（__dirname可以省略）。
    // 5. path.join()：用于路径拼接，不关心最终是否是绝对路径。
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'development',
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
    static: './'
  }
}
