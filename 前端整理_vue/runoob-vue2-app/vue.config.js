const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 3000,
    open: true
  },
  lintOnSave: false, // 关闭eslint检查
  transpileDependencies: true
})
