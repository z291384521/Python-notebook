//开始启动游戏

var loadTimes = 0;
var jsScr = "";
window['loadScript'] = loadScript;

var loadSingleScript = function (file, callback) {
    console.log(file)
    if (jsScr != file) {
        loadTimes = 0;
    }
    jsScr = file;
    var s = document.createElement("script")
    s.type = 'text/javascript';
    s.async = false;
    s.src = file
    s.addEventListener("load", function () {
        // 加载完成以后就删除
        s.parentNode.removeChild(s);
        s.removeEventListener('load', arguments.callee, false);
        callback();
    }, false)
    // 加载错误的逻辑 
    s.addEventListener("error", function () {
        s.parentNode.removeChild(s);
        s.removeEventListener('load', arguments.callee, false);
        loadTimes++;
        if (loadTimes > 5) {
            alert("主主程序文件加载失败,请检测网络刷新游戏！ \n " + file);
        } else {
            setTimeout(function () {
                loadSingleScript(file, callback);
            }, 2000);
        }
    })
    document.body.appendChild(s);
}


//加载项目工程
var loadScript = function (list, callback) {
    console.log(list)
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
    loadNext()
};




function start() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './mainfest.json', true);
    // 加载完成json文件执行
    // xhr.responseType = "json";
    xhr.addEventListener("load", function () {
        var manifest = JSON.parse(xhr.response)
        // 将变成数组形式
        // manifest.initial加上game里面写法
        // var list = [...manifest.initial, ...manifest.game]
        var list = manifest.initial.concat(manifest.game);
        // console.log(list)
        // 开始加载文件
        loadScript(list, function () {
            console.log("上面的mainjson加载完成了 引擎启动")
            egret.runEgret({
                //引擎渲染模式，"canvas" 或者 "webgl"
                renderMode: "webgl",
                //使用的音频类型，0:默认，1:qq audio，2:web audio，3:audio
                audioType: 0,
                // "calculateCanvasScaleFactor"：屏幕的物理像素适配方法，使用默认的即可
                calculateCanvasScaleFactor: function (context) {
                    var backingStore = context.backingStorePixelRatio ||
                        context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 1;
                    return (window.devicePixelRatio || 1) / backingStore;
                }
            })
        })

    })

    xhr.send(null);

}
start()