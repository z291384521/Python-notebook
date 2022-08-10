// 1. 导入 express
const express = require('express')
// 创建服务器实例
const app = express()

// 1. 导入路由模块
const router = require('./router')

app.get('/api/jsonp', (req, res) => {
    // TODO: 定义 JSONP 接口具体的实现过程
    // 1. 得到函数的名称
    const funcName = req.query.callback
    // 2. 定义要发送到客户端的数据对象
    const data = {
        name: 'zs',
        age: 22
    }
    // 3. 拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 4. 把拼接的字符串，响应给客户端
    res.send(scriptStr)
})


// 导入解析表单数据的中间件 body-parser
const parser = require('body-parser')
// 2. 使用 app.use() 注册中间件
app.use(parser.urlencoded({
    extended: false
}))

// 2. 注册路由模块
app.use('/api', router)


app.listen(8087, () => {
    console.log('express server running at http://127.0.0.1:8087')
})