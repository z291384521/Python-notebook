// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()


//挂载路由
router.post("/login", (req, res) => {

  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({
      status: 1,
      msg: '登录失败'
    })
  }
  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body // 用户的信息
  req.session.islogin = true // 用户的登录状态

  res.send({
    status: 0,
    msg: '登录成功'
  })


})

router.get("/username", (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({
      status: 1,
      msg: 'fail'
    })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })


})


// 退出登录的接口
router.post('/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})


// 4. 向外导出路由对象
module.exports = router