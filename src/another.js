console.log('another entrysss<br />')
// 添加下面的代码之后，another.js的HMR会生效，修改代码可以在不刷新页面的情况下重载
if (module.hot) {
  module.hot.accept()
}
