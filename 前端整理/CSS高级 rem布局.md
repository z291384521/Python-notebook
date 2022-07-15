# 移动web开发之rem布局

### rem基础

#### em

是一个相对单位，em是**父元素字体大小**。

~~~html
        div {
            font-size: 12px;
        }

        p {
            width: 10em;
            height: 10em;
            background-color: tomato;

        }
</head>

<body>
    <div>
        <p></p>
    </div>
</body>
~~~

![image-20220707103121120](img/CSS高级 rem布局/image-20220707103121120.png)

#### rem单位

rem的基准是相对于html元素的字体大小。

比如，根元素（html）设置font-size=12px; 非根元素设置width:1rem; 则换成px表示就是120px。

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=div, initial-scale=1.0">
    <title>Document</title>
    <style>
        html {
            font-size: 12px;
        }

        p {
            /* em是相对与父亲来说 */
            width: 10em;
            height: 10em;
            background-color: tomato;

        }
    </style>
</head>

<body>
    <div>
        <p></p>
    </div>
</body>

</html>
~~~



![image-20220707111723365](img/CSS高级 rem布局/image-20220707111723365.png)

优点

**rem的优点就是可以通过修改html（页面中只有一个html）里面的文字大小来改变页面中元素的大小可以整体控制**

### 媒体查询

#### 什么是媒体查询

媒体查询（Media Query）是CSS3新语法。

+ 使用 @media查询，可以针对不同的媒体类型定义不同的样式
+ @media 可以针对不同的屏幕尺寸设置不同的样式
+ 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面 
+ 目前针对很多苹果手机、Android手机，平板等设备都用得到多媒体查询

#### 媒体查询语法规范

+ 用 @media开头 注意@符号
+ mediatype  媒体类型
+ 关键字 and  not  only
+ media feature 媒体特性必须有小括号包含

~~~
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
~~~

mediatype 查询类型

​       将不同的终端设备划分成不同的类型，称为媒体类型

<img src="img/CSS高级 rem布局/1.jpg">

关键字

将媒体类型或多个媒体特性连接到一起做为媒体查询的条件。

+ and：可以将多个媒体特性连接到一起，相当于“且”的意思。
+ not：排除某个媒体类型，相当于“非”的意思，可以省略。
+ only：指定某个特定的媒体类型，可以省略。    

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    /* 这句话的意思就是： 在我们屏幕上
     并且 最大的宽度是 800像素 设置我们想要的样式 */
    /* max-width 小于等于800 变成粉红色 */
    @media screen and (max-width:800px) {
        body {
            background-color: pink;
        }
    }

    @media screen and (max-width: 500px) {
        body {
            background-color: purple;
        }
    }
</style>

<body>

</body>

</html>
~~~

#### 小案例

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
    /* 1. 媒体查询一般按照从大到小或者 从小到大的顺序来 */
    /* 2. 小于540px 页面的背景颜色变为蓝色 */
    @media screen and (max-width:539px) {
        boby {
            background-color: blue;
        }
    }

    /* 3. 540 ~ 970 我们的页面颜色改为 绿色 */
    /* @media screen and (min-width: 540px) and (max-width: 969px) {
        body {
            background-color: green;
        }
    } */

    /* 等于以下写法 */
    @media screen and (min-width: 540px) {
        body {
            background-color: green;
        }
    }

    /* 4. 大于等于970 我们页面的颜色改为 红色 */

    @media screen and (min-width: 970px) {
        body {
            background-color: red;
        }
    }

    /* 5. screen 还有 and 必须带上不能省略的 */
    /* 6. 我们的数字后面必须跟单位 970px 这个 px 不能省略的 */
</style>

<body>

</body>

</html>
~~~

媒体查询+rem实现元素动态变化.html

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        /* html {
            font-size: 100px;
        } */
        /* 从小到大的顺序 */
        
        @media screen and (min-width: 320px) {
            html {
                font-size: 50px;
            }
        }
        
        @media screen and (min-width: 640px) {
            html {
                font-size: 100px;
            }
        }
        
        .top {
            height: 1rem;
            font-size: .5rem;
            background-color: green;
            color: #fff;
            text-align: center;
            line-height: 1rem;
        }
    </style>
</head>

<body>
    <div class="top">购物车</div>
</body>

</html>
~~~



引入不同CSS的案例

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        /* 当我们屏幕大于等于 640px以上的，我们让div 一行显示2个 */
        /* 当我们屏幕小于640 我们让div一行显示一个 */
        /* 一个建议： 我们媒体查询最好的方法是从小到大 */
        /* 引入资源就是 针对于不同的屏幕尺寸 调用不同的css文件 */
    </style>
    <link rel="stylesheet" href="style320.css" media="screen and (min-width: 320px)">
    <link rel="stylesheet" href="style640.css" media="screen and (min-width: 640px)">
</head>

<body>
    <div>1</div>
    <div>2</div>
</body>

</html>
~~~

#### rem适配方案

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        @media screen and (min-width: 320px) {
            html {
                font-size: 21.33px;
            }
        }
        
        @media screen and (min-width: 750px) {
            html {
                font-size: 50px;
            }
        }
        
        div {
            width: 2rem;
            height: 2rem;
            background-color: pink;
        }
        /* 1. 首先我们选一套标准尺寸 750为准 
        2. 我们用屏幕尺寸 除以 我们划分的份数 得到了 html 里面的文字大小 但是我们知道不同屏幕下得到的文字大小是不一样的 */
        /* 3. 页面元素的rem值 =  页面元素在 750像素的下px值 / html 里面的文字大小 */
    </style>
</head>

<body>
    <div></div>
</body>

</html>
~~~


