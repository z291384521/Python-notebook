

第一步设置

*sudo p*asswd root

查看有没有安装服务默认只会安装client

~~~shell
dpkg -l | grep ssh
~~~

进程查询

~~~shell
ps -e | grep ssh
~~~

安装ssh

~~~shell
sudo apt-get install openssh-serve
~~~

~~~
sudo chomd 777 /etc/ssh/sshd_config
//插入如下语句
PermitRootLogin yes
PasswordAuthentication yes
~~~

~~~~
sudo /etc/init.d/ssh stop
sudo /etc/init.d/ssh start
~~~~

第二部取消限制

换源

第一步

~~~shell
sudo  cp   /etc/apt/sources.list   /etc/apt/sources.list.bak
sudo  chmod  777  /etc/apt/sources.list(方便编辑)
~~~

~~~shell
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
~~~





安装魔兽环境

~~~
sudo aptitude  install git cmake make gcc g++ clang libmysqlclient-dev libssl-dev libbz2-dev libreadline-dev libncurses-dev mysql-server libboost-all-dev
~~~

