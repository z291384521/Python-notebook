### 属性

结构伪类选择器主要根据文档结构来选择元素，常用于选择父级选择器里的子元素

| 选择符           | 简介                        |
| ---------------- | --------------------------- |
| E:first-child    | 匹配父元素中的第一个子元素E |
| E:last-child     | 匹配父元素中最后一个子元素E |
| E:nth-child(n)   | 匹配父元素中的第n个子元素E  |
| E:first-of-ytpe  | 指定类型E的第一个           |
| E:last-of-type   | 指定类型E的最后一个         |
| E:nth-of-type(n) | 指定类型E的第n个            |

#### E:nth-child(n)

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3新增结构伪类选择器</title>
    <style>
        /* 1. 选择ul里面的第一个孩子 小li */
        ul li:first-child {
            background-color: pink;
        }

        /* 2. 选择ul里面的最后一个孩子 小li */
        ul li:last-child {
            background-color: pink;
        }

        /* 3. 选择ul里面的第2个孩子 小li */
        ul li:nth-child(2) {
            background-color: skyblue;
        }

        ul li:nth-child(6) {
            background-color: skyblue;
        }
    </style>
</head>

<body>
    <ul>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ul>
</body>

</html>
~~~

![image-20220701170859640](img/CSS3中级 结构伪类选择器/image-20220701170859640.png)

<font color="red">**n** 可以是数字或者公式；2n偶数even；2n+1奇数odd；n从零开始 越等越循环中的0到末尾</font>

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3新增结构伪类选择器-nth-child</title>
    <style>
        /* 1.把所有的偶数 even的孩子选出来 */
        ul li:nth-child(even) {
            background-color: #ccc;
        }

        /* 2.把所有的奇数 odd的孩子选出来 */
        ul li:nth-child(odd) {
            background-color: gray;
        }
        /* 3.nth-child(n) 从0开始 每次加1 往后面计算  这里面必须是n 不能是其他的字母 选择了所有的孩子*/
        /* ol li:nth-child(n) {
            background-color: pink;
        } */
        /* 4.nth-child(2n)母选择了所有的偶数孩子 等价于 even*/
        /* ol li:nth-child(2n) {
            background-color: pink;
        }
        ol li:nth-child(2n+1) {
            background-color: skyblue;
        } */
        /* ol li:nth-child(n+3) {
            background-color: pink;
        } */
        ol li:nth-child(-n+3) {
            background-color: pink;
        }
    </style>
</head>

<body>
    <ul>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ul>
    <ol>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ol>
</body>

</html>
~~~

#### E:first-of-ytpe

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3新增结构伪类选择器-nth-child</title>
    <style>
        ul li:first-of-type {
            background-color: aqua;
        }

        ul li:nth-of-type(even) {
            background-color: brown;
        }
    </style>
</head>

<body>
    <ul>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ul>
</body>

</html>
~~~

![image-20220701172323306](img/CSS3中级 结构伪类选择器/image-20220701172323306.png)

### 两者区别

1. `nth-child` 对父元素里面所有孩子排序选择（序号是固定的）先找到第`n` 个孩子，然后看看是否匹配
2. `nth-of-type` 对父元素里面指定子元素排序选择。先去匹配`E` ，然后再根据`E` 找第`n` 个孩子

![image-20220701172641505](img/CSS3中级 结构伪类选择器/image-20220701172641505.png)

![image-20220701172800828](img/CSS3中级 结构伪类选择器/image-20220701172800828.png)