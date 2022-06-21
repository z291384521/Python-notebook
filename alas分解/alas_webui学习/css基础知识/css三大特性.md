### css 覆盖性

就近原则来

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CSS层叠性</title>
    <style>
       div {
           color: red;
           font-size: 12px;
       }
       div {
           color: pink;
       }
    </style>
</head>
<body>
    <div>长江后浪推前浪,前浪死在沙滩上</div>
</body>
</html>
```







### css继承

![image-20220621165046121](img/css三大特性/image-20220621165046121.png)

行宽的继承

![image-20220621171317606](img/css三大特性/image-20220621171317606.png)

### css优先级

![image-20220621171742273](img/css三大特性/image-20220621171742273.png)

需要注意的是

![image-20220621175205471](img/css三大特性/image-20220621175205471.png)

权重比较是 先左后右 

0 0 0 0

0 0 1 0

第一次 比较 千位 第二次 比较 百位 第三次比较 十位

#### 权重叠加

![image-20220621180214655](img/css三大特性/image-20220621180214655.png)