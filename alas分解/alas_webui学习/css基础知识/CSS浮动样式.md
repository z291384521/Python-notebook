![image-20220622145506876](img/CSS浮动样式/image-20220622145506876.png)

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>行内块中间有缝隙</title>
    <style>
        div {
            float: left;
            width: 150px;
            height: 200px;
            background-color: pink;
            /*这个可以实现但是有空隙*/
            /* display: inline-block; */
        }
    </style>
</head>

<body>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</body>

</html>
~~~

![image-20220622151455573](img/CSS浮动样式/image-20220622151455573.png)

![image-20220622151622472](img/CSS浮动样式/image-20220622151622472.png)