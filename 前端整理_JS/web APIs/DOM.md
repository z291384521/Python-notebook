### 什么是DOM

DOM（Document Object Model——文档对象模型）是用来呈现以及与任意 HTML 或 XML文档交互的API

白话文：DOM是浏览器提供的一套专门用来 操作网页内容 的功能 

DOM作用

 开发网页内容特效和实现用户交互

### DOM的一个示例

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Document</title>
</head>

<body>
	The truth about elks. 
</body>

</html>
~~~



![img](img/DOM/1757_D5Z41f_GLN42EL.gif!r800x0.jpg)



HTML的标签被称为元素（element）节点（或只是元素）。巢状标签成为一个子元素（也被称为子）。因此，对于一个HTML文件而言，是一个根节点（也被称为根元素）,然后 和 是 的子元素。 





元素内的文字被称这文字节点，

**标记为#text文字节点仅包含一个字串。它可能没有子元素，也就是说它永远只是树的叶子（没有成为树枝的可能）。**

