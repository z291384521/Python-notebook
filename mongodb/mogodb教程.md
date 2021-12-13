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
另外，sc可用于打开被禁用的服务，语法是：  
sc config "MongoDB" start= demand    //手动  
sc condig "MongoDB" start= auto      //自动  
sc config 服务名 start= disabled //禁用  
```

