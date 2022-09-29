async function bb() {
    console.log("1")
    // 等到调用的Promise执行完成以后
    let two = await Promise.resolve("2")
    console.log(two)
    console.log("3")
    // 返回的其实是Promise resolve的 执行成功的对象
    return Promise.resolve("别bb 用心学习")

}

console.log(bb())
// 会发现返回的是一个promise对象

bb().then(value => {
    console.log(value)
})