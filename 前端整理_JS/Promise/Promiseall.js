// Promise.all() 方法会发起并行的 Promise 异步操作， 等所有的异步操作全部结束后才会执行下一步的.then
// 操作（ 等待机制）
import thenFs from 'then-fs'

const promiseArr = [
    thenFs.readFile('./files/3.txt', 'utf8'),
    thenFs.readFile('./files/2.txt', 'utf8'),
    thenFs.readFile('./files/1.txt', 'utf8'),
]


Promise.all(promiseArr).then(result => {
    console.log(result)
})

Promise.race(promiseArr).then(result => {
    console.log(result)
})