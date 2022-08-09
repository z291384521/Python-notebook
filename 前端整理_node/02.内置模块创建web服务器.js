// 1. 导入 http 模块
const http = require('http')
// 2. 创建 web 服务器实例
const server = http.createServer()
// 3. 为服务器实例绑定 request 事件，监听客户端的请求
//只要有客户端来请求我们自己的服务器，就会触发request 事件，从而调用这个事件处理函数


server.on('request', function (req, res) {
    // req 请求对象
    // 只要服务器接收到了客户端的请求， 就会调用通过 server.on() 为服务器绑定的 request 事件处理函数。
    // 如果想在事件处理函数中， 访问与客户端相关的数据或属性， 可以使用如下的方式


    console.log('Someone visit our web server.')

    // .res 响应对象
    // 在服务器的 request 事件处理函数中， 如果想访问与服务器相关的数据或属性， 可以使用如下的方式
})

//connection当一个新的TCP stream 建立后发出此消息。stream 是一个net.Stream 的对象，
//通常用户不会访问/使用这个事件。 参数stream 也可以在request.connection 中访问到.
server.on('connection', function (req, res) {
    console.log('connection')
})
//当服务器关闭的时候触发此事件。
server.on('close', function (req, res) {
    console.log('close')
})

// 4. 启动服务器
server.listen(8080, function () {
    console.log('server running at http://127.0.0.1:8080')
})