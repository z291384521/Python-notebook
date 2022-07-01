### CSS3 盒子模型

box-sizing: **content-box** 盒子大小为 width + padding + border （以前默认的）

**padding 和border会撑开盒子**

box-sizing: **border-box** 盒子大小为 width

**padding 和border不会撑开盒子**



如果盒子模型我们改为了box-sizing: border-box ， 那padding和border就不会撑大盒子了（前提padding 和border不会超过width宽度）

~~~
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS3盒子模型</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            border: 20px solid red;
            padding: 15px;
            box-sizing: content-box;
        }
        p {
            width: 200px;
            height: 200px;
            background-color: pink;
            border: 20px solid red;
            padding: 15px;
            /* css3 盒子模型  盒子最终的大小就是 width  200 的大小 */
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div>
        小猪乔治
    </div>
    <p>
        小猪佩奇
    </p>
</body>
</html>
~~~

