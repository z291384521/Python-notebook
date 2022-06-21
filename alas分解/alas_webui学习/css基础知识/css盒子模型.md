





### css盒子模型

![image-20220621215116822](img/css盒子模型/image-20220621215116822.png)

解析盒子模型的内部

![image-20220621215203649](img/css盒子模型/image-20220621215203649.png)



#### 边框

![image-20220621222653422](img/css盒子模型/image-20220621222653422.png)





![image-20220621222717543](img/css盒子模型/image-20220621222717543.png)

![image-20220621222749809](img/css盒子模型/image-20220621222749809.png)

![image-20220621223427009](img/css盒子模型/image-20220621223427009.png)



### 内容边距

![image-20220621224246353](img/css盒子模型/image-20220621224246353.png)

padding快速写法

![image-20220621224803834](img/css盒子模型/image-20220621224803834.png)

边框  内容边距 都会撑大盒子

![image-20220621230057768](img/css盒子模型/image-20220621230057768.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>padding不会影响盒子大小的情况</title>
    <style>   
       h1 {
           /* width: 100%; */
           height: 200px;
           background-color: pink;
           padding: 30px;
       }
       div {
           width: 300px;
           height: 100px;
           background-color: purple;
       }
       div p {
           padding: 30px;
           background-color: skyblue;
       }
    </style>
</head>
<body>
   <h1></h1>
   <div>
       <p></p>
   </div>
</body>
</html>
```

### 外边距

![image-20220621231338056](img/css盒子模型/image-20220621231338056.png)

### 块盒子水平居中显示

![image-20220621232241956](img/css盒子模型/image-20220621232241956.png)

```
.header{
width:960px;
margin:0 auto;
}
```

![image-20220621232357430](img/css盒子模型/image-20220621232357430.png)

### 盒子的塌陷

![image-20220621233442630](img/css盒子模型/image-20220621233442630.png)

![image-20220621233720077](img/css盒子模型/image-20220621233720077.png)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>外边距合并-嵌套块级元素垂直外边距塌陷</title>
    <style>
        .father {
            width: 400px;
            height: 400px;
            background-color: purple;
            /* 父亲有边距 */
            margin-top: 50px;
            /* border: 1px solid red;  添加边框*/ 
            /* border: 1px solid transparent;  透明边框*/
            /* padding: 1px; 指定类边距*/
            
            overflow: hidden;
        }
        .son {
            width: 200px;
            height: 200px;
            background-color: pink;
             /* 儿子也有边距 */
            margin-top: 100px;
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>
</html>
```

![image-20220621233936376](img/css盒子模型/image-20220621233936376.png)

### 清除浏览器默认的边距

![image-20220621234448797](img/css盒子模型/image-20220621234448797.png)

![image-20220621234457833](img/css盒子模型/image-20220621234457833.png)

```
<span style={ margin 20px;}>行内元素只能设置左右内边距</span> 只生效左右
```

