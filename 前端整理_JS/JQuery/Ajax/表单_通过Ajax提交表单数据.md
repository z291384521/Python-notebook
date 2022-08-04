表单数据

## **表单的组成部分**

表单由三个基本部分组成：

表单标签 	form

表单域 	包含了文本框、密码框、隐藏域、多行文本框、复选框、单选框、下拉选择框和文件上传框等。

表单按钮  button

### form标签的属性

| **属性** | **值**                                                       | **描述**                                   |
| -------- | ------------------------------------------------------------ | ------------------------------------------ |
| action   | URL地址                                                      | 规定当提交表单时，向何处发送表单数据       |
| method   | get或post                                                    | 规定以何种方式把表单数据提交到 action  URL |
| enctype  | application/x-www-form-urlencoded  multipart/form-data  text/plain | 规定在发送表单数据之前如何对其进行编码     |
| target   | _blank  _self  _parent  _top  *framename*                    | 规定在何处打开 action  URL                 |



#### action  

action 属性用来规定当提交表单时，**向何处发送表单数据**。

action 属性的值应该是后端提供的一个 URL 地址，这个 URL 地址专门负责接收表单提交过来的数据。

当 <form> 表单在未指定 action 属性值的情况下，action 的默认值为当前页面的 URL 地址。

<font color="red">**注意**</font>：当提交表单后，页面会立即跳转到 action 属性指定的 URL 地址

#### target

target 属性用来规定<font color="red">**在何处打开action UR**</font>

| **值**      | **描述**                       |
| ----------- | ------------------------------ |
| _blank      | 在新窗口中打开。               |
| _self       | 默认。在相同的框架中打开。     |
| _parent     | 在父框架集中打开。（很少用）   |
| _top        | 在整个窗口中打开。（很少用）   |
| *framename* | 在指定的框架中打开。（很少用） |

#### method

method 属性用来规定**以何种方式**把表单数据提交到 action URL。

它的可选值有两个，分别是 get 和 post。

默认情况下，method 的值为 get，表示通过URL地址的形式，把表单数据提交到 action URL。



**注意：**

get 方式适合用来提交少量的、简单的数据。

post 方式适合用来提交大量的、复杂的、或包含文件上传的数据。

在实际开发中，<form> 表单的 post 提交方式用的最多，很少用 get。例如登录、注册、添加数据等表单操作，都需要使用 post 方式来提交表单。

#### **enctype**

enctype 属性用来规定在**发送表单数据之前如何对数据进行编码**。

它的可选值有三个，默认情况下，enctype 的值为 application/x-www-form-urlencoded，表示在发送前编码所有的字符

| **值**                            | **描述**                                                     |
| --------------------------------- | ------------------------------------------------------------ |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）                                 |
| multipart/form-data               | 不对字符编码。  在使用包含文件上传控件的表单时，必须使用该值。 |
| text/plain                        | 空格转换为 “+”  加号，但不对特殊字符编码。（很少用）         |

enctype

在涉及到**文件上传**的操作时，**必须**将 enctype 的值设置为 multipart/form-data

如果表单的提交不涉及到文件上传操作，则直接将 enctype 的值设置为 application/x-www-form-urlencoded 即可！



### **表单的同步提交**

通过点击 submit 按钮，触发表单提交的操作，从而使页面跳转到 action URL 的行为，叫做表单的同步提交。

**表单同步提交的缺点**

①<form>表单同步提交后，整个页面会发生跳转，**跳转到** **action URL** **所指向的地址**，用户体验很差。

②<form>表单同步提交后，**页面之前的状态和数据会丢失**。

### Ajax监听方法

~~~
  <form action="/login" id="f1">
    <input type="text" name="user_name" />
    <input type="password" name="password" />
    <button type="submit">提交</button>
  </form>

  <script>
    $(function () {
      // 第一种方式
      // $('#f1').submit(function () {
      //   alert('监听到了表单的提交事件')
      // })

      // 第二种方式
      $('#f1').on('submit', function () {  
        alert('监听到了表单的提交事件2')
      })
    })
  </script>
~~~

### Ajax阻止表单的默认提交行为 即点击提交以后不跳转

~~~
    $(function () {
      // 第一种方式
      // $('#f1').submit(function (e) {
      //   alert('监听到了表单的提交事件')
      //   e.preventDefault()
      // })

      // 第二种方式
      $('#f1').on('submit', function (e) {  
        alert('监听到了表单的提交事件2')
        e.preventDefault()
      })
    })
~~~

### Ajax获得表单中数据serialize()函数示例

~~~
  <form action="/login" id="f1">
    <input type="text" name="user_name" />
    <input type="password" name="password" />
    <button type="submit">提交</button>
  </form>

  <script>
    $(function () {
      // 第一种方式
      /* $('#f1').submit(function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        console.log(data)
      }) */

      // 第二种方式
      $('#f1').on('submit', function (e) {
        e.preventDefault()
        var data = $('#f1').serialize()
        console.log(data)
      })
    })
  </script>
~~~

user_name=1&password=23
