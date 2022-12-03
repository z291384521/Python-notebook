const isPregnant = true


//给成功失败传递值
const promise = new Promise((resolve, reject) => {
    if (isPregnant) {
        resolve("孩子他爹")
    } else {
        reject("老公")
    }
})

promise.then(name => {
    console.log('男人成为了${name}!')
}).catch(name => {
    console.log("男人成为了${name}!")
}).finally(() => {
    console.log("男人结婚了")
})