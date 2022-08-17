const fs = require("fs");
const filePath = ""


const filePromise = (filePath) => {
    return new Promise((resolve, reject) => {

        fs.readFile(filePath, "utf-8", (error1, data1) => {
            if (error1) {
                //失败的时候做的事情
                reject(error1);
            }
            //读取完之后做的事情
            resolve(data1)

        })
    })
}
filePromise(filePath).then().catch()