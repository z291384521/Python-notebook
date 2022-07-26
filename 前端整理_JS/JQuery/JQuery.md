### 安装

咱们先去下包:官网地址是这个:

https://jquery.com/

~~~html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js"
        integrity="sha512-n/4gHW3atM3QqRcbCn6ewmpxcLAHGaDjpEBu4xZd47N0W2oQ+6q7oc3PXstrJYXcbNU1OHdQ1T7pAP+gi5Yu8g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        console.log($)
        $('body').css('backgroundColor', 'yellowgreen')
    </script>

~~~





好啦，以上就是这一节的所有内容，小结一下

1. 使用jQuery的准备工作是哪两步？

   下包，导包

2. 完整版本和压缩版本的jQuery功能上有区别吗？

   没有

3. 文件名中有mini的是压缩版本还是完整版本？

   压缩版本

通过这一节的学习，咱们已经把使用jQuery的准备工作做好啦，下一节学习选择器，学习如何在jQuery中去获取要操纵的元素!



## 选择器

> jQuery中如何获取需要操纵的元素?

(**ppt**)

hello,同学们好!

这一节我们来学习`jQuery`的选择器，为什么先学他呢（**问号表情**），咱们来一起回忆一下,在学习css的时候为了给元素设置样式，首先要干嘛？学习Dom语法的时候为了操纵元素，又得先干嘛呢？是**不是要先找到元素啊**

`jQuery`中也是一样的,先得找到要操纵的元素,然后再去操纵他们,所以先来学习`选择器`，学习如何通过`jQuery`的方式去获取元素,语法很简单:

```javascript
// 基本用法
$('选择器')

```

直接调用$方法即可，选择器通过字符串的方式传递进去,基本上兼容所有`css`的选择器，比如标签选择器，类选择器，后代选择器等。这里大伙没准有点疑问这个$是哪里来的。咱们回忆一下上一节的内容，导入了jQuery之后我们通过console的方式了$这个全局变量，打印的是一个函数哦。既然是函数加括号是不是就是调用他呢。只不过之前的函数名都不是$而已，大伙想想是不是这么一回事。

考虑到还没学习其他的方法，这里依旧通过修改元素的背景色来进行测试，咱们去测试一下是不是可以直接使用css的选择器.

（**编辑器+浏览器**）

咱们先来测试一下标签选择器,所有元素都生效了哦，记住这个特点哦

```javascript
// 标签选择器
$('p').css('background', 'red');
```

再来测试一下类选择器，页面上哪个元素有类名呀？

```javascript
// 类选择器
$('.p').css('background', 'blue');
```

下一个是id选择器,看到那个有id的元素了吗

> 大伙id选择器的符号还记得吗？

```javascript
// id 选择器
$('#p').css('background', 'green');
```

最后测试一下后代选择器,这里考考大家,如果不想改背景色啦，**想改字体颜色咋写呀?**

对咯,写成`color`就好，保存之后页面上`body`内部的所有p标签就改变了呢

```javascript
// 后代选择器
$('body p').css('color', 'white');
```

因为后续的课程中会陆续用到其他的选择器所以这里就不再单独演示啦

