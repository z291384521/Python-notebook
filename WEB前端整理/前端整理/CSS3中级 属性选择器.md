### 属性

| 选择符        | 简介                                  |
| ------------- | ------------------------------------- |
| E[att]        | 选择具有att属性的E元素                |
| E[att=”val”]  | 选择具有att属性且属性值等于val的E元素 |
| E[att^=”val”] | 匹配具有att属性且值以val开头的E元素   |
| E[att$=”val”] | 匹配具有att属性且值以val结尾的E元素   |
| E[att*=”val”] | 匹配具有att属性且值中含有val的E元素   |

![image-20220701165616563](img/CSS3中级 属性选择器/image-20220701165616563.png)



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
    /* 必须是input 但是同时具有 value这个属性 选择这个元素  [] */
    input[value] {
        color: pink;
    }

    /* 只选择 type =text 文本框的input 选取出来 */
    input[type=text] {
        color: rgb(230, 13, 157);
    }

    /* 选择首先是div 然后 具有class属性 并且属性值 必须是 icon开头的这些元素 */
    div[class^=icon] {
        color: red;
    }

    /* 选择首先是div 然后 具有class属性以data结尾的元素 */
    section[class$=data] {
        color: blue;
    }

    div.icon1 {
        color: skyblue;
    }
</style>

<body>
    <input type="text" value="请输入用户名">
    <input type="text" name="" id="">
    <input type="password" name="" id="" value="zzzz">
    <!-- 3. 属性选择器可以选择属性值开头的某些元素 -->
    <div class="icon1">小图标1</div>
    <div class="icon2">小图标2</div>
    <div class="icon3">小图标3</div>
    <div class="icon4">小图标4</div>
    <!-- 4. 属性选择器可以选择属性值结尾的某些元素 -->
    <section class="icon1-data">我是安其拉</section>
    <section class="icon2-data">我是哥斯拉</section>
    <section class="icon3-ico">哪我是谁</section>
</body>

</html>
~~~

