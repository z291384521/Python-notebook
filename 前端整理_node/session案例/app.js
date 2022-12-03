// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// TODO_01：请配置 Session 中间件
const session = require('express-session')

app.use(
    session({
        secret: 'itheima',
        resave: false,
        saveUninitialized: true,
    })
)


// 1. 导入解析表单数据的中间件 body-parser
const parser = require('body-parser')
// 2. 使用 app.use() 注册中间件
app.use(parser.urlencoded({
    extended: false
}))

//导入路由模块
const router = require("./router")
app.use("/api", router)
//
app.listen(80, function () {
    console.log('Express server running at http://127.0.0.1:80')
})