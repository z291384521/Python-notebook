import thenFs from 'then-fs'



// 由于 node.js 官方提供的 fs 模块仅支持以回调函数的方式读取文件，
// 不支持 Promise 的调用方式。 因此， 需
// 要先运行如下的命令， 安装 then - fs 这个第三方包， 
//从而支持我们基于 Promise 的方式读取文件的内容：

// 无法保证读取顺序

thenFs.readFile('./files/1.txt', 'utf8').then((r1) => {
    // 打印1内容
    console.log(r1)
})
thenFs.readFile('./files/2.txt', 'utf8').then((r2) => {
    console.log(r2)
})
thenFs.readFile('./files/3.txt', 'utf8').then((r3) => {
    console.log(r3)
})



//保证顺序读法
thenFs
    .readFile('./files/11.txt', 'utf8')
    .catch((err) => {
        console.log(err.message)
    })
    .then((r1) => {
        console.log(r1)
        return thenFs.readFile('./files/2.txt', 'utf8')
    })
    .then((r2) => {
        console.log(r2)
        return thenFs.readFile('./files/3.txt', 'utf8')
    })
    .then((r3) => {
        console.log(r3)
    })