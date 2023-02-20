### 过渡（transition）,CSS过渡动画

~~~
transition : 要过渡的属性 花费时间 运动曲线 何时开始；

多个属性，利用逗号进行分割

属性：想要变化的css属性，宽度高度 背景颜色 内外边距都可以。所有属性过渡all；
花费时间：单位是秒（必须写单位）
运动曲线：默认是ease（可以省略）
何时开始：单位是秒（必须写单位） 可以设置延迟触发时间 默认是0s（可以省略）
~~~

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3 过渡效果</title>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            /* 后面的可以不写 */
            transition: width 1s;
        }

        div:hover {
            width: 400px;
            hegiht:400px;
        }
    </style>
</head>

<body>
    <div>

    </div>
</body>

</html>
~~~

多个属性可以用

transition: width 1s, height 1s; 

或者全部属性用

ransition: all 1s;
