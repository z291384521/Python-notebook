问题描述：
启动虚拟机，忘记用户密码。

![登录失败](img/liunx_免密登录/73662de04c1e43fea4904092905c4e10.png)

 解决方案：
直接修改用户密码

1、重启系统，在开机过程中，在启动界面**按e键**

![启动界面](img/liunx_免密登录/e2a00e61302545018378008dfa5ae259.png)

2、在接下来的界面中找到以linux16开始的行，将光标一直移动到 LANG=en_US.UTF-8 后面，空格，再追加**init=/bin/sh**

![添加命令](img/liunx_免密登录/a152a8040ff04fcd980636271d9c7066.png)

3、按**Ctrl+X**进入“单用户模式”，输入**mount -o remount, rw /**挂载根目录

![挂载根目录](img/liunx_免密登录/b8bbc84b767a4183b63a5520f68db218.png)
4、输入 **passwd 用户名** 进入密码修改（需要输入两次）

![修改root密码](img/liunx_免密登录/03b52dbde3e84ad3bd23441a723ca590.png) 
5、更新系统信息和启动系统：依次输入**touch /.autorelabel 和 exec /sbin/init**

![重启系统](img/liunx_免密登录/76ccc8626be840bc8c47e1ac94154695.png)

 6、进入登录界面，输入修改后的密码，登录成功

![登录成功](img/liunx_免密登录/82c78cb5224a488da57eb249829ab851.png)