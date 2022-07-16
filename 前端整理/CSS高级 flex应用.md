### flex布局原理

+ flex 是 flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为 flex 布局。
+ 当我们为父盒子设为 flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。
+ flex布局又叫伸缩布局 、弹性布局 、伸缩盒布局 、弹性盒布局 
+ 采用 Flex 布局的元素，称为 Flex 容器（flex

container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex
item），简称"项目"。

**总结**：就是通过给父盒子添加flex属性，来控制子盒子的位置和排列方式

### 父项常见属性

+ flex-direction：设置主轴的方向
+ justify-content：设置主轴上的子元素排列方式
+ flex-wrap：设置子元素是否换行  
+ align-content：设置侧轴上的子元素的排列方式（多行）
+ align-items：设置侧轴上的子元素排列方式（单行）
+ flex-flow：复合属性，相当于同时设置了 flex-direction 和 flex-wrap

#### flex-direction设置主轴的方向

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
            /* 给父级添加flex属性 */
            display: flex;
            width: 800px;
            height: 300px;
            background-color: pink;
            flex-direction: row;
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: purple;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
</body>

</html>
~~~

默认row

![image-20220706154333961](img/CSS高级 flex应用/image-20220706154333961.png)

flex-direction: column;

![image-20220706154409863](img/CSS高级 flex应用/image-20220706154409863.png)

###  justify-content 设置主轴上的子元素排列方式

<img src="img/CSS高级 flex应用/3.jpg">

~~~
justify-content: flex-end;
~~~

![image-20220706154925119](img/CSS高级 flex应用/image-20220706154925119.png)

~~~
justify-content: center;
~~~

![image-20220706155016294](img/CSS高级 flex应用/image-20220706155016294.png)

~~~
justify-content: space-around;
~~~

![image-20220706155120639](img/CSS高级 flex应用/image-20220706155120639.png)

~~~
justify-content: space-between;
~~~

![image-20220706155216832](img/CSS高级 flex应用/image-20220706155216832.png)

#### flex-wrap设置是否换行

+ 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，flex布局中默认是不换行的。

+ nowrap 不换行

  flex布局中，默认的子元素是不换行的， 如果装不开，会缩小子元素的宽度，放到父元素里面

![image-20220706161001316](img/CSS高级 flex应用/image-20220706161001316.png)

+ wrap 换行

  

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
            display: flex;
            width: 600px;
            height: 400px;
            background-color: pink;
            /* flex布局中，默认的子元素是不换行的， 如果装不开，会缩小子元素的宽度，放到父元素里面  */
            flex-wrap: nowrap;
            /* flex-wrap: wrap; */
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: purple;
            color: #fff;
            margin: 10px;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
    </div>
</body>

</html>
~~~

![image-20220706161050030](img/CSS高级 flex应用/image-20220706161050030.png)



#### align-items 设置侧轴上的子元素排列方式（单行 ）



以上学习现在需要个这个能在中心处

~~~
justify-content: center;
~~~

+ flex-start 从头部开始
+ flex-end 从尾部开始
+ center 居中显示
+ stretch 拉伸

![image-20220706171215724](img/CSS高级 flex应用/image-20220706171215724.png)

现在加上

~~~
justify-content: center;
align-items: center;
~~~

![image-20220706171655938](img/CSS高级 flex应用/image-20220706171655938.png)

注意拉伸需要不设置儿子物体宽度他会对父亲对齐

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
            display: flex;
            width: 800px;
            height: 400px;
            background-color: pink;

            justify-content: center;
            align-items: stretch;
        }

        div span {
            width: 150px;
            /* height: 100px; */
            background-color: purple;
            color: #fff;
            margin: 10px;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
</body>

</html>
~~~

![image-20220706173557499](img/CSS高级 flex应用/image-20220706173557499.png)

#### align-content  设置侧轴上的子元素的排列方式（多行）

设置子项在侧轴上的排列方式 并且只能用于子项出现 换行 的情况（多行），在单行下是没有效果的。

<img src="img/CSS高级 flex应用/4.jpg">



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
            display: flex;
            width: 800px;
            height: 400px;
            background-color: pink;
            /* 换行 */
            flex-wrap: wrap;
            /* 因为有了换行，此时我们侧轴上控制子元素的对齐方式我们用 align-content */
            /* align-content: flex-start; */
            align-content: center;
            /* align-content: space-between; */
            align-content: space-around;
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: purple;
            color: #fff;
            margin: 10px;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
    </div>
</body>

</html>
~~~

####  align-content 和align-items区别

+ align-items  适用于单行情况下， 只有上对齐、下对齐、居中和 拉伸
+ align-content适应于换行（多行）的情况下（单行情况下无效）， 可以设置 上对齐、下对齐、居中、拉伸以及平均分配剩余空间等属性值。 
+ **总结就是单行找align-items  多行找 align-content**

![image-20220706193927531](img/CSS高级 flex应用/image-20220706193927531.png)

#### 简写

~~~
flex-flow:row wrap;

等于
flex-direction:row;
flex-wrap:wrap
~~~

### flex 属性

flex 属性定义子项目分配剩余空间，用flex来表示占多少份数。

~~~
.item {
    flex: <number>; /* 默认值 0 */
}
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


        section {
            display: flex;
            width: 60%;
            height: 150px;
            background-color: pink;
            margin: 0 auto;
            line-height: 150px;
            text-align: center;
        }

        section div:nth-child(1) {
            width: 100px;
            height: 150px;
            background-color: red;
        }

        section div:nth-child(2) {
            /* 对剩余空间进行操作 */
            flex: 1;
            background-color: green;
        }

        section div:nth-child(3) {
            width: 100px;
            height: 150px;
            background-color: blue;
        }

        p {
            display: flex;
            width: 60%;
            height: 150px;
            background-color: pink;
            margin: 100px auto;
        }

        p span {
            flex: 1;
        }

        p span:nth-child(2) {
            flex: 2;
            background-color: purple;
        }
    </style>
</head>

<body>
    <section>
        <div>我给了对应宽高</div>
        <div>我就是你们剩下的全部</div>
        <div>我给了对应宽高</div>
    </section>
    <p>
        <span>1份</span>
        <span>2份</span>
        <span>3份</span>
    </p>
</body>

</html>
~~~

![image-20220716161732932](img/CSS高级 flex应用/image-20220716161732932.png)

#### align-self控制子项自己在侧轴上的排列方式

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。

默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

~~~
span:nth-child(2) {
      /* 设置自己在侧轴上的排列方式 */
      align-self: flex-end;
}
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
            display: flex;
            width: 80%;
            height: 300px;
            background-color: pink;
            /* 让三个子盒子沿着侧轴底侧对齐 */
            /* align-items: flex-end; */
            /* 我们想只让3号盒子下来底侧 */
        }

        div span {
            width: 150px;
            height: 100px;
            background-color: purple;
            margin-right: 5px;
        }

        div span:nth-child(3) {
            align-self: flex-end;
        }
    </style>
</head>

<body>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
</body>

</html>
~~~

