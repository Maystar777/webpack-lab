// import './style.css'
import './style.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// //之前的写法, 在新版找不到这个方法了，会报错
// import ReactDom from 'react-dom'
// //---- 古早版本----
// ReactDOM.render(<App />, document.getElementById('root'))
// //---- React18的写法----
// const root = ReactDom.createRoot(document.getElementById('root'))
// root.render(<App />)

//---- React19的写法----
// 清除现有的 HTML 内容
document.body.innerHTML = '<div id="root"></div>'
// 创建一个根容器
const root = createRoot(document.getElementById('root'))
// 使用根容器的 render 方法来渲染React元素
root.render(<App />)