## `1`	`下载地址`

Windows下载分为两种种模式一种类似安装包（msi） 一种是二进制文件

```
https://www.mongodb.com/try/download/community
```

这次将二进制安装mogdb

## 2添加环境变量

将下载文件解压出来 bin加入环境变量

MONGODB_HOME为下载解压文件的位置

将%MONGODB_HOME%\bin加入path系统变量

## 3初始化数据库

数据路径需要先建立 不然会报错

```
mongod --port <端口> --dbpath <数据路径> --logpath <日志路径> --logappend --directoryperdb     
参数说明：  
--port    表示数据库端口，默认27017；  
--dbpath  表示数据文件存储路径，一般设置为%MONGODB_HOME%data；  
--logpath 表示日志文件存储路径，一般设置为%MONGODB_HOME%logsmongodb.log；  
--logappend 表示日志追加，默认是覆盖；  
--directoryperdb 表示每个db一个目录；  

mongod --port 28017	--dbpath %MONGODB_HOME%data --logpath %MONGODB_HOME%\logsmongodb.log --logappend --directoryperdb

```

mongod --port 28017 --dbpath %MONGODB_HOME%\data --logpath %MONGODB_HOME%\logsmongodb.log --logappend --directoryperdb

![image-20211213165118405](C:\Users\明日香\AppData\Roaming\Typora\typora-user-images\image-20211213165118405.png)

出现这样我们

通过网页访问

http://127.0.0.1:28017/

![image-20211213165504391](C:\Users\明日香\AppData\Roaming\Typora\typora-user-images\image-20211213165504391.png)

出现这样既服务启动

## 4数据库建立

重新打开一个cmd窗口输入命令

mongo -port 28017

进入了命令mongo里面常见命令如下

> db.createUser({ user: "root", pwd: "123456", roles: [ { role: "root", db: "admin"} ]})

## 5将mongod配置变成一个服务

`mongod --port 28017 --dbpath %MONGODB_HOME%\data --logpath %MONGODB_HOME%\logsmongodb.log --logappend --directoryperdb --auth --install` 

1. 注意： 
2.   a.必须切换到bin目录下执行该条指令。 
3.   b.必须添加--auth用户权限才会生效。 
4.   c.除了“--auth”和“--install”两个参数，别的参数要跟你设置用户时启动服务的参数一致，尤其是“--directoryperdb”。 
5.   第一次配置完成后，一定要重启才会有效果 重启mongo客户端，不输入-u-p可以直接进入，但是不具有任何权限。正确的访问方式为：mongo 数据库名 -u 用户名 -p。另外设置用户 

mongo -u "root" -p "123456" -port 28017

```
启动MongoDB服务，执行命令：
net start "MongoDB"
删除MongoDB服务，执行命令：    
net delete "MongoDB"  
停止
net stop "MongoDB"

```

## 用法命令

- 查看当前的数据库：db(没有切换数据库的情况下默认使用test数据库)
- 查看所有的数据库：show dbs /show databases

- 切换数据库：use db_name 
  - db_name为show dbs后返回的数据库名
- 删除当前的数据库：db.dropDatabase()

手动创建集合：

- db.createCollection(name,options)
- db.createCollection("stu")
- db.createCollection("sub", { capped : true, size : 10 } )
- 参数capped：默认值为false表示不设置上限，值为true表示设置上限
- 参数size：集合所占用的字节数。 当capped值为true时，需要指定此参数，表示上限大小，当文档达到上限时， 会将之前的数据覆盖，单位为字节

- 查看集合：show collections
- 删除集合：db.集合名称.drop()
- 检查集合是否设定上限: db.集合名.isCapped()



## mongodb常见数据类型

- Object ID： 文档ID/数据的ID，数据的主键
- String： 字符串，最常用，必须是有效的UTF-8
- Boolean： 存储一个布尔值，true或false
- Integer： 整数可以是32位或64位，这取决于服务器
- Double： 浮点数
- Arrays： 数组/列表
- Object： mongodb中的一条数据/文档，即文档嵌套文档
- Null： 存储null值
- Timestamp： 时间戳，表示从1970-1-1到现在的总秒数
- Date： 存储当前日期或时间的UNIX时间格式



_id的含义

[
  {
    "_id": {"$oid": "61b8058622d45a4889351e4e"},
    "age": 22,
    "name": "郭靖"
  }
]

- 每个文档都有一个属性，为_id，保证每个文档的唯一性，mongodb默认使用_id作为主键

  - 可以手动设置_id的值，如果没有提供，那么MongoDB为每个文档提供了一个独特的_id， 类型为objectID

- objectID是一个12字节的十六进制数,每个字节两位，一共是24位的字符串：
  - 前4个字节为当前时间戳
  - 接下来3个字节的机器ID
  - 接下来的2个字节中MongoDB的服务进程id
  - 最后3个字节是简单的增量值

## 增删改查

#### mongodb插入数据

```
//插入单个 插入一群
db.stu.insertOne({'name':'郭靖', 'age':22})
//插入多个 需要是列表类型
// db.stu.insertMany([])
```

####  简单查询

- 方法find()： 查询

  `db.集合名称.find({条件文档})`

- 方法findOne()：查询，只返回第一个

  `db.集合名称.findOne({条件文档})`

- 方法pretty()： 将结果格式化；不能和findOne()一起使用！

  `db.集合名称.find({条件文档}).pretty()`

- 等于： 默认是等于判断， 没有运算符
- 小于：`$lt （less than）`
- 小于等于：`$lte （less than equal）`
- 大于：`$gt （greater than）`
- 大于等于：`$gte`
- 不等于：`$ne`

#### 逻辑运算符主要指与、或逻辑

- and：在json中写多个条件即可

```
查询年龄大于或等于18， 并且性别为true的学生
db.stu.find({age:{$gte:18},gender:true})
```

- or:使用$or， 值为数组， 数组中每个元素为json

```
查询年龄大于18， 或性别为false的学生
db.stu.find({$or:[{age:{$gt:18}},{gender:false}]})

查询年龄大于18或性别为男生， 并且姓名是郭靖
db.stu.find({$or:[{age:{$gte:18}},{gender:true}],name:'gj'})
```

####  范围运算符

使用`$in`， `$nin` 判断数据是否在某个数组内

查询年龄为18、 28的学生
db.stu.find({age:{$in:[18,28,38]}})

#### 支持正则表达式

使用$regex编写正则表达式

查询name以'黄'开头的数据
db.stu.find({name:{$regex:'^黄'}})

#### 自定义查询

mongo shell 是一个js的执行环境

使用$where 写一个函数， 返回满足条件的数据

```
查询年龄大于30的学生
db.stu.find({
 $where:function() {
     return this.age>30;}
})
```

