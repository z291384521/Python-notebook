## 初级选择器

### 标签选择器

![image-20220630113900772](img/CSS初级 选择器/image-20220630113900772.png)

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>基础选择器之标签选择器</title>
    <style>
    /* 标签选择器 : 写上标签名 */
    p {
        color: green;
    }
    div {
        color: pink;
    }
    </style>
</head>
<body>
    <p>男生</p>
    <p>男生</p>
    <p>男生</p>
    <div>女生</div>
    <div>女生</div>
    <div>女生</div>
</body>
</html>
~~~

### 优缺点

优点 ：标签选择器可以把某一类标签全部选择出来

缺点 ：不能设计差异化样式，只能选择全部的当前标签

###  类选择器 用的最多

![image-20220630115046091](img/CSS初级 选择器/image-20220630115046091.png)

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>基础选择器之类选择器</title>
    <style>
        /* 类选择器口诀: 样式点定义  结构类(class)调用  一个或多个 开发最常用*/
      .red {
          color: red;
      }
      .star-sing {
        color: green;
      }
      .memeda {  
         color: pink;
      }
    </style>
</head>
<body>
    <ul>
        <li class="red">冰雨</li>
        <li class="red">来生缘</li>
        <li>李香兰</li>
        <li class="memeda">生僻字</li>
        <li class="star-sing">江南style</li>
    </ul>
    <div class="red">我也想变红色</div>
</body>
</html>
~~~

#### 类选择器-多类名

~~~
<div class="red font20">盖伦</div>
~~~

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>利用类选择器画三个盒子</title>
    <style>
        .box {
            width: 150px;
            height: 100px;
            font-size: 30px;
        }
        .red {
        
            /* 背景颜色 */
            background-color: red;
        }
        .green {
           
            background-color: green;
        }
    </style>
</head>
<body>
    <div class="box red">红色</div>
    <div class="box green">绿色</div>
    <div class="box red">红色</div>
</body>
</html>
~~~

###  id 选择器

类选择器在修改样式中用的最多，id 选择器一般用于页面**唯一性的元素上**，经常和 JavaScript 搭配使用。

![image-20220630121219648](img/CSS初级 选择器/image-20220630121219648.png)

~~~
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>基础选择器之id选择器</title>
    <style>
        /* id选择器的口诀: 样式#定义, 结构id调用, 只能调用一次, 别人切勿使用 */
      #pink {
          color: pink;
      }
    
    </style>
</head>
<body>
    <div id="pink">迈克尔·杰克逊</div>
    <div>pink老师</div>
</body>
</html>
~~~

### 通配符选择器

![image-20220630121234319](img/CSS初级 选择器/image-20220630121234319.png)

~~~
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>基础选择器之通配符选择器</title>
    <style>
     * {
         color: red;
     }
     /* * 这里把 html  body  div  span  li 等等的标签都改为了红色 */
    </style>
</head>
<body>
    <div>我的</div>
    <span>我的</span>
    <ul>
        <li>还是我的</li>
    </ul>
</body>
</html>
~~~

