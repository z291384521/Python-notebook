### transform: translate（位置）

转换（tranform） 是CCS3中具有颠覆性的特征之一，可以实现元素的位移、旋转、缩放

- 移动：transale
- 旋转：rolate
- 缩放：scale

~~~
transform: translate(x,y); 或者分开写
transform: translateX(n);
transform: translateY(n);
~~~

- 定义 2D 转换中的移动，沿着 X 和 Y 轴移动元素
- **translate最大的优点：不会影响到其他元素的位置**
- translate中的百分比单位是相对于自身元素的 translate:(50%,50%);
- 对行内标签没有效果

~~~
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
            /* transform: translate(x, y); */
        }

        div:first-of-type {
            background-color: rgb(20, 59, 215);
            transform: translate(30px, 30px);
        }

        div:last-of-type {
            background-color: purple;
        }

        /* div:hover {
            width: 400px;
            height: 400px;
        } */
    </style>
</head>

<body>
    <div></div>
    <div></div>

</body>

</html>
~~~



![image-20220701231703006](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220701231703006.png)



利用转换垂直居中

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            position: relative;
            width: 500px;
            height: 500px;
            background-color: pink;
            /* 1. 我们tranlate里面的参数是可以用 % */
            /* 2. 如果里面的参数是 % 移动的距离是 盒子自身的宽度或者高度来对比的 */
            /* 这里的 50% 就是 50px 因为盒子的宽度是 100px */
            /* transform: translateX(50%); */
        }

        p {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            background-color: purple;
            /* margin-top: -100px;
            margin-left: -100px; */
            /* translate(-50%, -50%)  盒子往上走自己高度的一半   */
            transform: translate(-50%, -50%);
        }

        span {
            /* translate 对于行内元素是无效的 */
            transform: translate(300px, 300px);
        }
    </style>
</head>

<body>
    <div>
        <p></p>
    </div>
    <span>123</span>
</body>

</html>
~~~

### transform : rotate（度数）

~~~
transform:rotate(度数)
~~~

- rotate里面跟度数， 单位是 deg 比如 rotate(45deg)
- 角度为正时，顺时针，负时，为逆时针
- 默认旋转的中心点是元素的中心点

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
            position: relative;
            width: 500px;
            height: 500px;
            background-color: pink;
            transition: transform 1s;
        }

        div:hover {
            transform: rotate(360deg);
        }
    </style>
</head>

<body>
    <div></div>
</body>

</html>
~~~

~~~
transform-origin: x y;
~~~

- l注意后面的参数 x 和 y 用空格隔开
- lx y 默认转换的中心点是元素的中心点 (50% 50%)
- l还可以给x y 设置 像素 或者 方位名词 （top bottom left right center）





~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            position: relative;
            width: 50px;
            height: 50px;
            background-color: pink;
            /* transition: transform 1s; */

            transition: all 1s;
            transform-origin: 10px 10px;
        }

        div:hover {
            transform: rotate(360deg);
        }
    </style>
</head>

<body>
    <div></div>
</body>

</html>
~~~

#### 案例

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
            width: 200px;
            height: 200px;
            border: 1px solid pink;
            margin: 10px;
            float: left;
        }
        
        div::before {
            content: "黑马";
            display: block;
            width: 100%;
            height: 100%;
            background-color: hotpink;
            transform: rotate(180deg);
            transform-origin: left bottom;
            transition: all 0.4s;
        }
        /* 鼠标经过div 里面的before 复原 */
        
        div:hover::before {
            transform: rotate(0deg);
        }
    </style>
</head>

<body>
    <div></div>
    <div></div>
    <div></div>
</body>

</html>
~~~

### transform:scale(**缩放**)

~~~
transform:scale(x,y);
~~~

- 注意其中的x和y用逗号分隔

- transform:scale(1,1) ：宽和高都放大一倍，相对于没有放大

- transform:scale(2,2) ：宽和高都放大了2倍

- transform:scale(2) ：只写一个参数，第二个参数则和第一个参数一样，相当于 scale(2,2)

- transform:scale(0.5,0.5)：缩小

- sacle缩放最大的优势：可以设置转换中心点缩放，**默认以中心点缩放的，而且不影响其他盒子**

  123没有动

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
            width: 200px;
            height: 200px;
            background-color: pink;
            margin: 100px auto;
            /* transform-origin: left bottom; */
        }
        
        div:hover {
            /* 1. 里面写的数字不跟单位 就是倍数的意思 1 就是1倍  2就是 2倍 */
            /* transform: scale(x, y); */
            /* transform: scale(2, 2); */
            /* 2. 修改了宽度为原来的2倍  高度 不变 */
            /* transform: scale(2, 1); */
            /* 3. 等比例缩放 同时修改宽度和高度，我们有简单的写法  以下是 宽度修改了2倍，高度默认和第一个参数一样*/
            /* transform: scale(2); */
            /* 4. 我们可以进行缩小  小于1 就是缩放 */
            /* transform: scale(0.5, 0.5); */
            /* transform: scale(0.5); */
            /* 5. scale 的优势之处： 不会影响其他的盒子 而且可以设置缩放的中心点*/
            /* width: 300px;
            height: 300px; */
            transform: scale(2);
        }
    </style> 
</head>

<body>
    <div></div>
    123123
</body>

</html>
~~~

~~~
变话中心点
~~~

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
            position: relative;
            width: 50px;
            height: 50px;
            background-color: pink;
            /* transition: transform 1s; */

            transition: all 1s;
            transform-origin: bottom;
        }

        div:hover {
            transform: scale(2, 2);

            /* transform: rotate(360deg); */
        }
    </style>
</head>

<body>
    <div></div>
    123123
</body>

</html>
~~~

### 多个一起使用

1. 同时使用多个转换，其格式为：transform: translate() rotate() scale() ...等，
2. 其顺序会影转换的效果。（先旋转会改变坐标轴方向）
3. **我们同时有位移和其他属性的时候，记得要将位移放到最前**

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            position: relative;
            width: 50px;
            height: 50px;
            background-color: pink;
            /* transition: transform 1s; */

            transition: all 1s;
            transform-origin: bottom;
        }

        div:hover {
            transform: translate(150px, 50px) rotate(180deg) scale(1.2);

            /* transform: rotate(360deg); */
        }
    </style>
</head>

<body>
    <div></div>
    123123
</body>

</html>
~~~

