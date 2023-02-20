// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring')


// 这是解析表单数据的中间件
app.use((req, res, next) => {
    // 定义中间件具体的业务逻辑
    // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
    let str = ''
    // 2. 监听 req 的 data 事件
    // 在中间件中， 需要监听 req 对象的 data 事件， 来获取客户端发送到服务器的数据。
    // 如果数据量比较大， 无法一次性发送完毕， 则客户端会把数据切割后， 分批发送到服务器。 所以 data 事件可能会触
    // 发多次， 每一次触发 data 事件时， 获取到数据只是完整数据的一部分， 需要手动对接收到的数据进行拼接。

    req.on('data', (chunk) => {
        str += chunk
        console.log(chunk)
    })
    // 3. 监听 req 的 end 事件
    //当请求体数据接收完毕之后， 会自动触发 req 的 end 事件。
    req.on('end', () => {


        // 在 str 中存放的是完整的请求体数据
        console.log(str)
        // TODO: 把字符串格式的请求体数据，解析成对象格式

        // const body = qs.parse(str)
        const body = (new URLSearchParams(str)).toString();
        console.log(body)
        req.body = body
        next()
    })
})

app.post('/user', (req, res) => {
    res.send(req.body)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8087, function () {
    console.log('Express server running at http://127.0.0.1:8087')
})