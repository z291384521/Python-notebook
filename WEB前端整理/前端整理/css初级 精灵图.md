##### 精灵图（sprites）

> 为了有效地减少服务器接受和发送请求的次数，提高页面的加载速度
>
> 将网页中的一些小背景图像整合到一张大图中，服务器只需要一次请求
>
> - 移动背景图片位置，此时可以使用`background-position`
> - 移动的距离也就是这个目标图片的`x`和`y`坐标，注意是网页中的坐标

##### 字体图标（iconfont）

> 主要用于显示网页中通用、常用的一些小图标
>
> **字体图标展示的是图标，本质属于字体**
>
> - 轻量级：一个图标字体要比一系列的图像要小，一旦字体加载了，图标就会马上渲染出来，减少了服务器请求
> - 灵活性：本质其实是文字，可以随意改变颜色、产生阴影、透明效果、旋转

###### 字体图标的下载

> - [**icomoon**](https://icomoon.io/)字库
> - 阿里[**iconfont**](https://www.iconfont.cn/)字库（免费）

###### 字体文件引用

```css
/* 字体声明 */
        @font-face {
            font-family: 'icomoon';
            src: url('fonts/icomoon.eot?p4ssmb');
            src: url('fonts/icomoon.eot?p4ssmb#iefix') format('embedded-opentype'), url('fonts/icomoon.ttf?p4ssmb') format('truetype'), url('fonts/icomoon.woff?p4ssmb') format('woff'), url('fonts/icomoon.svg?p4ssmb#icomoon') format('svg');
            font-weight: normal;
            font-style: normal;
            font-display: block;
        }
```