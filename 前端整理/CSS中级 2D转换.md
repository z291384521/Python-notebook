### transform属性

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

![image-20220701232406953](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220701232406953.png)

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

![image-20220701232912860](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220701232912860.png)