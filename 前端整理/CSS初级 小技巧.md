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

