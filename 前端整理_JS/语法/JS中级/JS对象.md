### 对象 语法

~~~js
let 对象名 ={}
let pesson={}
~~~

###  对象有属性和方法组成

~~~js
let 对象名 = {
属性名:属性值,
方法名:函数
}
~~~

### 方法调用

~~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        // let goods = {
        //     name: '小米10青春版',
        //     num: '100012816024',
        //     weight: '0.55kg',
        //     address: '中国大陆'
        // }
        // console.dir(goods)

        // 声明人对象
        let person = {
            uname: '刘德华',
            age: 18,
            sex: '男',
            // 方法名：function(){}
            sayHi: function () {
                console.log('hi~~~')
            },
            mtv: function (s) {
                console.log(s)
            }
        }
        // console.log(uname)
        // 1. 访问属性  得到值   对象.属性名
        console.log(person.uname)
        console.log(person.age)
        // 2. 访问属性  得到值   对象['属性名']
        console.log(person['sex'])
        // 调用方法 对象.方法名()
        person.sayHi()
        person.mtv('无间道')

        // document.write()
    </script>
</body>

</html>
~~~~

### 对象本质是无序的数据集合, 操作数据无非就是 增 删 改 查 语法：

~~~
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        let obj = {
            uname: '小明',
            age: 18

        }
        console.log(obj.age)
        // 修改  对象.属性 =  新值
        obj.age = 81
        console.log(obj)
        // 新增一个属性  js 可以非常方便的动态新增属性或者方法
        obj.sex = '男'
        // 会去对象里面找是否有 sex这个属性，如果有则更新值修改
        // 会去对象里面找是否有 sex这个属性，如果没有则新增这个属性
        obj.sing = function () {
            console.log('hi')
        }
        console.dir(obj)

        // 删除 (了解)
        delete obj.uname
        console.dir(obj)

    </script>
</body>

</html>
~~~

### 遍历对象

~~~html
        let obj = {
            uname: '小明',
            age: 18,
            sex: '男'
        }
        for (let k in obj) {
            console.log(k)
            console.log(obj[k])
        }
~~~

### 遍历数组

~~~
 // 数组对象
        let students = [{
                name: '小明',
                age: 18,
                gender: '男',
                hometown: '河北省'
            },
            {
                name: '小红',
                age: 19,
                gender: '女',
                hometown: '河南省'
            },
            {
                name: '小刚',
                age: 17,
                gender: '男',
                hometown: '山西省'
            },
            {
                name: '小丽',
                age: 18,
                gender: '女',
                hometown: '山东省'
            }
        ]
        for (let k in students) {
            console.log(k)
            console.log(students[k])
        }
~~~

