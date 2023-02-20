### **动画的基本使用**

#### **用keyframes 定义动画**

~~~
@keyframes 动画名称 {
 /* 开始状态 */
   0%{
        width:100px;
   }  
    /* 结束状态 */
   100%{
        width:200px;
   }
}

~~~

- 0% 是动画的开始，100% 是动画的完成。这样的规则就是动画序列。
- 在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。
- 动画是使元素从一种样式逐渐变化为另一种样式的效果。您可以改变任意多的样式任意多的次数。
- 请用百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    /* 我们想页面一打开，一个盒子就从左边走到右边 */
    /* 1. 定义动画 */
    @keyframes move {

        0% {
            transform: translate(0px, 0px);
        }

        25% {
            transform: translate(100px, 0px);

        }

        50% {
            transform: translate(100px, 100px);
        }

        75% {
            transform: translate(0px, 100px);
        }

        100% {
            transform: translate(0px, 0px);
        }
    }

    div {
        width: 200px;
        height: 200px;
        background-color: pink;
        /* 调用动画 */
        animation-name: move;
        /* 整体持续时间 */
        animation-duration: .2s;
    }
</style>

<body>
    <div></div>
</body>

</html>
~~~

#### 动画属性



| **属性**                  | **描述**                                                     |
| ------------------------- | ------------------------------------------------------------ |
| @keyframes                | 规定动画。                                                   |
| animation                 | 所有动画属性的简写属性，除了animation-play-state属性。       |
| animation-name            | 规定@keyframes动画的名称。（必须的）                         |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒，默认是0。（必须的）    |
| animation-timing-function | 规定动画的速度曲线，默认是“ease”。                           |
| animation-delay           | 规定动画何时开始，默认是0。                                  |
| animation-iteration-count | 规定动画被播放的次数，默认是1，还有infinite                  |
| animation-direction       | 规定动画是否在下一周期逆向播放，默认是“normal“,alternate逆播放 |
| animation-play-state      | 规定动画是否正在运行或暂停。默认是"running",还有"paused"。   |
| animation-fill-mode       | 规定动画结束后状态，保持forwards回到起始backwards            |

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    /* 我们想页面一打开，一个盒子就从左边走到右边 */
    /* 1. 定义动画 */
    @keyframes move {

        0% {
            transform: translate(0px, 0px);
        }

        25% {
            transform: translate(100px, 0px);

        }

        50% {
            transform: translate(100px, 100px);
        }

        75% {
            transform: translate(0px, 100px);
        }

        /* 100% {
            transform: translate(0px, 0px);
        } */

        100% {
            transform: translate(20px, 0px);
        }
    }

    div {
        width: 200px;
        height: 200px;
        background-color: pink;
        /* 调用动画 */
        animation-name: move;
        /* 整体持续时间 */
        animation-duration: 2s;
        /* 运动曲线 */
        animation-timing-function: ease;
        /* 延迟执行 */
        animation-delay: .1s;
        /* 重复次数 iteration 重复的 conut 次数 infinite 无限 */
        /* animation-iteration-count: 1; */
        /* 是否反方向播放 默认的是 normal 如果想要反方向 就写 alternate */
        /* 会占用一次次数 */
        /* animation-direction: alternate; */
        /* 动画结束后的状态 默认的是 backwards 回到起始状态 我们可以让他停留在结束状态 forwards */
        animation-fill-mode: forwards;
        /* animation: name duration timing-function delay iteration-count direction fill-mode; */
        /* animation: move 2s linear 0s 1 alternate forwards; */
        /* 前面2个属性 name duration 一定要写 */
        /* animation: move 2s linear alternate forwards; */
    }

    div:hover {
        /* 鼠标经过div 让这个div 停止动画，鼠标离开就继续动画 */
        animation-play-state: paused;
    }
</style>

<body>
    <div></div>
</body>

</html>
~~~

#### **动画简写属性**

~~~
animation：动画名称 持续时间 运动曲线  何时开始  播放次数  是否反方向  动画起始或者结束的状态;
animation: myfirst 5s linear 2s infinite alternate;
~~~

简写属性里面不包含 animation-play-state 

暂停动画：animation-play-state:  puased;  经常和鼠标经过等其他配合使用

想要动画走回来 ，而不是直接跳回来：animation-direction  ： alternate

盒子动画结束后，停在结束位置： animation-fill-mode ：  forwards 

#### **速度曲线细节**

~~~
animation-timing-function：规定动画的速度曲线，默认是“ease”
~~~

| linear      | 动画从头到尾的速度是相同的。匀速               |
| ----------- | ---------------------------------------------- |
| ease        | 默认。动画以低速开始，然后加快，在结束前变慢。 |
| ease-in     | 动画以低速开始。                               |
| ease-out    | 动画以低速结束。                               |
| ease-in-out | 动画以低速开始和结束。                         |
| steps()     | 指定了时间函数中的间隔数量（步长）             |

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            overflow: hidden;
            font-size: 20px;
            width: 0;
            height: 30px;
            background-color: pink;
            /* 让我们的文字强制一行内显示 */
            white-space: nowrap;
            /* steps 就是分几步来完成我们的动画 有了steps 就不要在写 ease 或者linear 了 */
            animation: w 4s steps(10) forwards;
        }
        
        @keyframes w {
            0% {
                width: 0;
            }
            100% {
                width: 200px;
            }
        }
    </style>
</head>

<body>
    <div>世纪佳缘我在这里等你</div>
</body>

</html>
~~~

