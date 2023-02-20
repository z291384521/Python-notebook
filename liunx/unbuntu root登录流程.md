

第一步设置

*sudo p*asswd root

查看有没有安装服务默认只会安装client

~~~shell
dpkg -l | grep ssh
~~~

进程

~~~shell
ps -e | grep ssh
~~~

启动

~~~
sudo /etc/init.d/ssh stop
sudo /etc/init.d/ssh start
~~~

~~~
sudo chomd 777 /etc/ssh/sshd_config
PermitRootLogin yes
PasswordAuthentication yes
~~~









安装ssh

~~~
sudo apt-get install openssh-server
~~~

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

第一个安装aptitude 

~~~
aptitude与 apt-get 一样，是 Debian 及其衍生系统中功能极其强大的包管理工具。与 apt-get 不同的是，aptitude在处理依赖问题上更佳一些。举例来说，aptitude在删除一个包时，会同时删除本身所依赖的包。这样，系统中不会残留无用的包，整个系统更为干净。
~~~

~~~
sudo aptitude  install git cmake make gcc g++ clang libmysqlclient-dev libssl-dev libbz2-dev libreadline-dev libncurses-dev mysql-server libboost-all-dev
~~~

