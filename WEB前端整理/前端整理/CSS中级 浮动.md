## 传统网页布局

传统网页布局的三种方式 简单说,就是盒子如何进行排列顺序

 普通流（标准流）  浮动  定位

这三种布局方式都是用来摆放盒子的，盒子摆放到合适位置，布局自然就完成了。

### 标准流

所谓的标准流: 就是标签按照规定好默认方式排列

1 块级元素会独占一行，从上向下顺序排列

2 行内元素会按照顺序，从左到右顺序排列，碰到父元素边缘则自动换行。

### 浮动

![image-20220630225311602](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630225311602.png)

如果使用行内块元素 会出现大量白色空隙

![image-20220630225448032](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630225448032.png)

所以

浮动最典型的应用：可以让多个块级元素一行内排列显示。

在运用中**多个块级元素纵向排列找标准流，多个块级元素横向排列找浮动。**

#### 特征

~~~
选择器 { float: 属性值; }
~~~

| 属性值 | 描述         |
| ------ | ------------ |
| none   | 不浮动       |
| left   | 元素向左浮动 |
| right  | 元素向右浮动 |

加了浮动之后的元素,会具有很多特性,需要我们掌握的. 

1. **浮动元素会脱离标准流(脱标)** 
2. 浮动的元素会一行内显示并且元素顶部对齐  
3. **浮动的元素会具有行内块元素的特性.**



**浮动元素会脱离标准流(脱标)** 

一张图片表示

![image-20220630230800411](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630230800411.png)

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>**浮动元素会脱离标准流(脱标)** </title>
    <style>
        /* 设置了浮动（float）的元素会：
        1. 脱离标准普通流的控制（浮）移动到指定位置（动）。
        2.浮动的盒子不在保留原先的位置 */
        .box1 {
            float: left;
            width: 200px;
            height: 200px;
            background-color: pink;
        }

        .box2 {
            width: 300px;
            height: 300px;
            background-color: rgb(0, 153, 255);
        }
    </style>
</head>

<body>
    <div class="box1">浮动的盒子</div>
    <div class="box2">标准流的盒子</div>
</body>

</html>
~~~

![image-20220630230238228](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630230238228.png)

字体并没有在下面 因为浮动本事就是用来做字体环绕的效果



**浮动的元素会一行内显示并且元素顶部对齐**  

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浮动元素特性-浮动元素一行显示</title>
    <style>
        div {
            float: left;
            width: 200px;
            height: 200px;
            background-color: pink;
        }

        .two {
            background-color: purple;
            height: 249px;
        }

        .four {
            background-color: skyblue;
        }
    </style>
</head>

<body>
    <div>1</div>
    <div class="two">2</div>
    <div>3</div>
    <div class="four">4</div>
</body>

</html>
~~~

宽度不够会出对折情况

![image-20220630230533254](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630230533254.png)

![image-20220630230449079](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630230449079.png)



**浮动的元素会具有行内块元素的特性.**

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浮动的元素具有行内块元素特点</title>
    <style>
        /* 任何元素都可以浮动。不管原先是什么模式的元素，添加浮动之后具有行内块元素相似的特性。 */
        span,
        div {
            float: left;
            width: 200px;
            height: 100px;
            background-color: pink;
        }

        /* 如果行内元素有了浮动,则不需要转换块级\行内块元素就可以直接给高度和宽度 */
        p {
            float: right;
            height: 200px;
            background-color: purple;
        }
    </style>
</head>

<body>
    <span>1</span>
    <span>2</span>

    <div>div</div>
    <p>ppppppp</p>
</body>

</html>
~~~

#### 使用

先用标准流的父元素排列上下位置, 之后内部子元素采取浮动排列左右位置

![image-20220630230918356](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630230918356.png)

#### 浮动布局注意点

 一个元素浮动了，理论上其余的兄弟元素也要浮动。 

一个盒子里面有多个子盒子，如果其中一个盒子浮动了，那么其他兄弟也应该浮动，以防止引起问题。

 **浮动的盒子只会影响浮动盒子后面的标准流,不会影响前面的标准流**

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>浮动注意点</title>
    <style>
        /* 如果一个子元素浮动了,尽量其他盒子也浮动,这样保证这些子元素一行显示 */
        .box {
            width: 900px;
            height: 300px;
            background-color: pink;
            margin: 0 auto;
        }

        .box2 {
            width: 900px;
            height: 300px;
            background-color: rgb(109, 186, 21);
            margin: 0 auto;
        }

        .damao {
            float: left;
            width: 200px;
            height: 200px;
            background-color: purple;
        }

        .ermao {
            /* float: left; */
            width: 400px;
            height: 450px;
            background-color: red;
        }

        .sanmao {
            /* float: left; */
            width: 300px;
            height: 440px;
            background-color: blue;
        }
    </style>
</head>

<body>
    <div class="box">
        <div class="damao">大毛</div>
        <div class="ermao">二毛</div>
        <div class="sanmao">三毛</div>
    </div>
    <div class="box2">

    </div>
</body>

</html>
~~~

![image-20220630232445707](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630232445707.png)

## 清除浮动

由于父级盒子很多情况下，不方便给高度（比如一些购物网站的商品页，商品数量不是一定的，父盒子的高度也是不一定的），但子盒子浮动又不占有位置，最后的结果就是父级盒子高度为 0，会影响下面的标准盒子。

这个时候我们就需要 `清除浮动`。清除浮动不是让元素不浮动，清楚浮动的 `实质是清除浮动元素造成的影响。`

如果父盒子本身有高度，就不需要清除浮动。`清除浮动后，父级会根据浮动的子盒子自动检测高度。` 父级有了高度，就不会影响后面的标准流了。

![image-20220630232933318](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630232933318.png)

#### 清除浮动 —— 额外标签法

例如

```html
<div style="clear:both"></div>，或者其他标签（如<br />等）。
```

优点： 通俗易懂，**书写方便**

缺点： 添加许多无意义的标签，**结构化较差**

注意： 要求这个新的空标签必须是**块级元素**。

~~~
<!-- <span class="clear"></span> --> 会失败
~~~



~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>清除浮动之额外标签法</title>
    <style>
        .box {
            width: 800px;
            border: 1px solid blue;
            margin: 0 auto;
        }

        .damao {
            float: left;
            width: 300px;
            height: 200px;
            background-color: purple;
        }

        .ermao {
            float: left;
            width: 200px;
            height: 200px;
            background-color: pink;
        }

        .footer {
            height: 200px;
            background-color: black;
        }

        .clear {
            clear: both;
        }
    </style>
</head>

<body>
    <div class="box">
        <div class="damao">大毛</div>
        <div class="ermao">二毛</div>
        <div class="ermao">二毛</div>
        <div class="ermao">二毛</div>
        <div class="ermao">二毛</div>
        <div class="clear"></div>
        <!-- 这个新增的盒子要求必须是块级元素不能是行内元素 -->
        <!-- <span class="clear"></span> -->
    </div>
    <div class="footer"></div>

</body>

</html>
~~~

![image-20220630233120909](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630233120909.png)

#### 父级添加 overflow 属性

可以给父级添加 overflow 属性，将其属性值设置为 hidden、 auto 或 scroll

例如：

```html
overflow:hidden | auto | scroll; //溢出部分隐藏
```

优点：代码简洁

缺点：无法显示溢出的部分

注意：是给父元素添加代码

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>为什么需要清除浮动</title>
    <style>
        .box {
            /* 清除浮动 */
            overflow: hidden;
            width: 800px;
            border: 1px solid blue;
            margin: 0 auto;
        }

        .damao {
            float: left;
            width: 300px;
            height: 200px;
            background-color: purple;
        }

        .ermao {
            float: left;
            width: 200px;
            height: 200px;
            background-color: pink;
        }

        .footer {
            height: 200px;
            background-color: black;
        }
    </style>
</head>

<body>
    <div class="box">
        <div class="damao">大毛</div>
        <div class="ermao">二毛</div>
    </div>
    <div class="footer"></div>

</body>

</html>
~~~

![image-20220630233313700](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630233313700.png)

#### 父级添加after伪元素

:after 方式是额外标签法的升级版。给父元素添加：

```css
 .clearfix:after {  
   content: ""; 
   display: block; 
   height: 0; 
   clear: both; 
   visibility: hidden;  
 } 
 .clearfix {  /* IE6、7 专有 */ 
   *zoom: 1;
 } 
```

优点：没有增加标签，结构更简单

缺点：不照顾低版本浏览器

代表网站： 百度、淘宝网、网易等

#### 父级添加双伪元素

#### 父级添加双伪元素

给父元素添加

```css
 .clearfix:before,.clearfix:after {
   content:"";
   display:table; 
 }
 .clearfix:after {
   clear:both;
 }
 .clearfix {
    *zoom:1;
 } 
```

优点：代码更简洁

缺点：不照顾低版本浏览器

代表网站：小米、腾讯等

![image-20220630233507743](C:\Users\反转旋木\AppData\Roaming\Typora\typora-user-images\image-20220630233507743.png)