### 查看包

“dpkg ”是“ [Debian Packager](http://www.digitser.net/) ”的简写。为“Debian” 专门开发的套件管理系统，方便软件的安装

~~~
dpkg -l | grep ssh
~~~

#### 查看端口命令

~~~
netstat -tnlo | grep "111"
~~~

~~~shell
netstat -tunpl |grep 111
### 常用解压与压缩命

~~~~
tar -zxvf filename.tar.gz               # 解压
tar -zcvf filename.tar.gz dirname       # 将dirname和其下所有文件（夹）压缩
tar -C dirname -zxvf filename.tar.gz    # 解压到目标路径dirname路径
~~~~

zip

~~~she
unzip -O cp936 filename.zip            # 解压（不乱码）
zip filename.zip dirname               # 将dirname本身压缩
zip -r filename.zip dirname            # 压缩，递归处理，将指定目录下的所有文件和子目录一并压缩
~~~

