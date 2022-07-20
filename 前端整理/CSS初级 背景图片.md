### 插入图片

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>背景图片</title>
    <style>
        div {
            width: 300px;
            height: 300px;
            /* 不要落下 url()   */
            background-image: url(images/logo.png);
        }
    </style>
</head>

<body>
    <div></div>
</body>

</html>
~~~

图片的状态

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>背景图片平铺</title>
    <style>
        div {
            width: 300px;
            height: 300px;
            background-color: pink;
            background-image: url(images/logo.png);
            /* 1.背景图片不平铺 */
            /* background-repeat: no-repeat; */
            /* 2.默认的情况下,背景图片是平铺的 */
            /* background-repeat: repeat; */
            /* 3. 沿着x轴平铺 */
            /* background-repeat: repeat-x; */
            /* 4. 沿着Y轴平铺 */
            background-repeat: repeat-y;
            /* 页面元素既可以添加背景颜色也可以添加背景图片 只不过背景图片会压住背景颜色 */
        }
    </style>
</head>

<body>
    <div></div>
</body>

</html>
~~~



repeat

![image-20220720212140253](img/CSS初级 背景图片/image-20220720212140253.png)

repeat-x

![image-20220720212211309](img/CSS初级 背景图片/image-20220720212211309.png)

repeat-y

![image-20220720212224398](img/CSS初级 背景图片/image-20220720212224398.png)

no-repeat

![image-20220720212242921](img/CSS初级 背景图片/image-20220720212242921.png)

space

![image-20220720212319410](img/CSS初级 背景图片/image-20220720212319410.png)

round

![image-20220720212334392](img/CSS初级 背景图片/image-20220720212334392.png)

### background-size

此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。

二倍图

会用这个缩放