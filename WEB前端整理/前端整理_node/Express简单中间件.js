const express = require('express')
const app = express()

// // 定义一个最简单的中间件函数
const mw = function (req, res, next) {
    console.log('这是最简单的中间件函数')
    // 把流转关系，转交给下一个中间件或路由
    next()
}

// // 将 mw 注册为全局生效的中间件
app.use(mw)


// 定义第一个全局中间件
app.use((req, res, next) => {
    console.log('调用了第1个全局中间件')
    next()
})
// 定义第二个全局中间件
app.use((req, res, next) => {
    console.log('调用了第2个全局中间件')
    next()
})

// 1. 定义中间件函数
const mw1 = (req, res, next) => {
    console.log('调用了局部生效的中间件')
    next()
}


const mw2 = (req, res, next) => {
    console.log('调用了第二个局部生效的中间件')
    next()
}

app.get('/', [mw1, mw2], (req, res) => {
    console.log('调用了 / 这个路由')
    res.send('Home page.')
})
app.get('/user', (req, res) => {
    console.log('调用了 /user 这个路由')
    res.send('User page.')
})

app.listen(8087, () => {
    console.log('http://127.0.0.1:8087')
})