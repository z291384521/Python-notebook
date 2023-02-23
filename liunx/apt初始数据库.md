1 在ubuntu中apt安装mysql服务确实简单但是

第一个问题就来了他用户以及密码是多少

查阅资料以后发现他会写在配置文件里面

/etc/mysql/debian.cnf

![image-20230223204435159](apt初始数据库.assets/image-20230223204435159.png)

~~~
mysql -udebian-sys-maint -p
~~~

输入密码登录

然后就是创建root用户以及修改密码

注意localhost如果查询

~~~
select host, user, authentication_string, plugin from user;
~~~

![image-20230223211147114](apt初始数据库.assets/image-20230223211147114.png)

@后面就是啥

~~~
alter user'root'@'%' identified by 'root';
~~~

也可以这样

~~~
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
~~~



远程登录

~~~sql
update user set host='%' where user='root';
这一步很重要关系远程链接
update user set plugin='mysql_native_password' where user ='root';
给root所有权限
grant all on *.* to 'root'@'%';
flush privileges;
~~~



发现 还是链接不上 需要将配置文件注释掉

~~~
#bind-address		= 127.0.0.1
#mysqlx-bind-address	= 127.0.0.1
~~~



删除创建用户

~~~
delete from user where user='root' and host='%';
create user 'root'@'%' identified by 'root';
flush privileges;
~~~









最好改密码时候重置密码为空否则容易出错

~~~
ERROR 1396 (HY000): Operation ALTER USER failed for 'root'@'localhost'
~~~

充值密码命令

update user set authentication_string='' where user='root';

flush privileges;






