import React from 'react'
import addContent from './add-content.js'
import Foo from './foo.jsx'
const App = () => (
  <div>
    <h1>My first Webpack app.</h1>
    <p>{addContent()}</p>
    {/* 测试 webpack 的分割代码功能 */}
    <Foo />
  </div>
)
export default App
