###  单行文字垂直居中的代码

让文字的行高等于盒子的高度 就可以让文字在当前盒子内垂直居中

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>单行文字垂直居中</title>
    <style>
        div {
            width: 200px;
            height: 40px;
            background-color: pink;
            line-height: 40px;
        }
    </style>
</head>

<body>
    <div>我要居中</div>
</body>

</html>
~~~

![image-20220630164135763](img/CSS初级 小技巧/image-20220630164135763.png)

### 书写习惯

~~~
1布局定位属性：display / position / float / clear / visibility / overflow
2自身属性：width / height / margin / padding / border / background
3文本属性：color / font / text-decoration / text-align / vettical-align / white-space / break-word
4其他属性(CSS3)：content / cursor / border-radius / box-shadow / text-shadow
~~~

### Cale

需求我们的子盒子宽度永远比父盒子小30像素

 width: calc(100% - 30px);

括号里面可以 加减乘除 

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3 过渡效果</title>
    <style>
        .father {
            width: 300px;
            height: 200px;
            background-color: pink;
        }

        .son {
            width: calc(100% - 30px);
            height: 30px;
            background-color: skyblue;
        }
    </style>
</head>

<body>
    <!-- 需求我们的子盒子宽度永远比父盒子小30像素 -->
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
~~~

### 浏览器私有前缀
-moz-：代表 firefox 浏览器私有属性
-ms-：代表 ie 浏览器私有属性
-webkit-：代表 safari、chrome 私有属性
-o-：代表 Opera 私有属性

### 背景缩放background-size
~~~
background-size: 背景图片宽度 背景图片高度;
~~~
cover把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。

contain把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域

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
            width: 500px;
            height: 500px;
            border: 2px solid red;
            background: url(images/dog.jpg) no-repeat;
            /* background-size: 图片的宽度 图片的高度; */
            /* background-size: 500px 200px; */
            /* 1.只写一个参数 肯定是宽度 高度省略了  会等比例缩放 */
            /* background-size: 500px; */
            /* 2. 里面的单位可以跟%  相对于父盒子来说的 */
            /* background-size: 50%; */
            /* 3. cover 等比例拉伸 要完全覆盖div盒子  可能有部分背景图片显示不全 */
            /* background-size: cover; */
            /* 4. contain 高度和宽度等比例拉伸 当宽度 或者高度 铺满div盒子就不再进行拉伸了 可能有部分空白区域 */
            background-size: contain;
        }
    </style>
</head>

<body>
    <div></div>
    <p></p>
</body>

</html>
~~~

### 图片img标签缩小直接给宽度即可

~~~
.good .bd li img {
    width: 304px;
}
~~~

![image-20220714171102703](img/CSS初级 小技巧/image-20220714171102703.png)

![image-20220714171114819](img/CSS初级 小技巧/image-20220714171114819.png)
