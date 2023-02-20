const express = require('express')
const app = express()


//express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器，
//例如， 通过如下代码就可以将 public 目录下的图片、 CSS 文件、 JavaScript 文件对外开放访问了：

// 如果希望在托管的静态资源访问路径之前， 挂载路径前缀， 则可以使用如下的方式：
app.use('/public', express.static('./public'))
// 现在， 你就可以通过带有 / public 前缀地址来访问 public 目录中的文件了：
// http: //localhost:3000/public/images/kitten.jpg
//     http: //localhost:3000/public/css/style.css
//     http: //localhost:3000/public/js/app.js


app.use(express.static('./pulic'))
// 现在， 你就可以访问 public 目录中的所有文件了：
// http: //localhost:3000/images/bg.jpg
//     http: //localhost:3000/css/style.css
//     http: //localhost:3000/js/login.j

app.listen(8087, () => {
    console.log('express server running at http://127.0.0.1')
})