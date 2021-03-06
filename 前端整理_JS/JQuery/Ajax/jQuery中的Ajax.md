



### **$.get()函数的语法**

~~~
$.get(url, [data], [callback])
~~~



| **参数名** | **参数类型** | **是否必选** | **说明**                 |
| ---------- | ------------ | ------------ | ------------------------ |
| url        | string       | 是           | 要请求的资源地址         |
| data       | object       | 否           | 请求资源期间要携带的参数 |
| callback   | function     | 否           | 请求成功时的回调函数     |

不带参数

~~~
$.get('http://www.liulongbin.top:3006/api/getbooks', function(res) {
    console.log(res) // 这里的 res 是服务器返回的数据
})

~~~

带参数

~~~
$.get('http://www.liulongbin.top:3006/api/getbooks', { id: 1 }, function(res) {
    console.log(res)
})

~~~

### **$.post()函数的语法**

~~~
$.post(url, [data], [callback])
~~~

| **参数名** | **参数类型** | **是否必选** | **说明**                 |
| ---------- | ------------ | ------------ | ------------------------ |
| url        | string       | 是           | 提交数据的地址           |
| data       | object       | 否           | 要提交的数据             |
| callback   | function     | 否           | 数据提交成功时的回调函数 |