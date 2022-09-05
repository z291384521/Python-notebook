//开始启动游戏


loadSingleScript = function (file, callback) {


    callback();
}


//加载项目工程
var loadScript = function (list, callback) {
    var loaded = 0
    var loadNext = function () {
        loadSingleScript(list[loaded], function () {
            // 执行完先加 然后判断 是的就执行回调方法
            loaded++
            if (loaded >= list.length) {
                callback();
            } else {
                loadNext();
            }
        })
    }
    // 追后别忘了启动
};




function start() {
    console.log("dasdad")
    var pathName = document.location.pathname
    console.log(pathName)
    var xhr = new XMLHttpRequest();

    xhr.open('GET', './manifest.json?v=' + Math.random(), true);
    // 加载完成json文件执行
    xhr.addEventListener("load", function () {
        var manifest = JSON.parse(xhr.response);
        // 将变成数组形式
        // manifest.initial加上game里面写法
        var list = manifest.initial.concat(manifest.game);
        console.log(list)
        // 开始加载文件
        loadScript(list, function () {
            console.log("上面的mainjson加载完成了 引擎启动")
        })

    })

    xhr.send(null);

}
start()