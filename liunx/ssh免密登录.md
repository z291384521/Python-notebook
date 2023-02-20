**一、下载OpenSSH**

魔兽中选择/bin安装

**利用ssh-keygen命令生成密钥对（公钥及对应的私钥）**

~~~
 -a trials
 在使用 -T 对 DH-GEX 候选素数进行安全筛选时需要执行的基本测试数量。
 -B 显示指定的公钥/私钥文件的 bubblebabble 摘要。
 -b bits
 指定密钥长度。对于RSA密钥，最小要求768位，默认是2048位。DSA密钥必须恰好是1024位(FIPS 186-2 标准的要求)。
 -C comment
 提供一个新注释
 -c 要求修改私钥和公钥文件中的注释。本选项只支持 RSA1 密钥。
 程序将提示输入私钥文件名、密语(如果存在)、新注释。
 -D reader
 下载存储在智能卡 reader 里的 RSA 公钥。
 -e 读取OpenSSH的私钥或公钥文件，并以 RFC 4716 SSH 公钥文件格式在 stdout 上显示出来。
 该选项能够为多种商业版本的 SSH 输出密钥。
 -F hostname
 在 known_hosts 文件中搜索指定的 hostname ，并列出所有的匹配项。
 这个选项主要用于查找散列过的主机名/ip地址，还可以和 -H 选项联用打印找到的公钥的散列值。
 -f filename
 指定密钥文件名。
 -G output_file
 为 DH-GEX 产生候选素数。这些素数必须在使用之前使用 -T 选项进行安全筛选。
 -g 在使用 -r 打印指纹资源记录的时候使用通用的 DNS 格式。
 -H 对 known_hosts 文件进行散列计算。这将把文件中的所有主机名/ip地址替换为相应的散列值。
 原来文件的内容将会添加一个”.old”后缀后保存。这些散列值只能被 ssh 和 sshd 使用。
 这个选项不会修改已经经过散列的主机名/ip地址，因此可以在部分公钥已经散列过的文件上安全使用。
 -i 读取未加密的SSH-2兼容的私钥/公钥文件，然后在 stdout 显示OpenSSH兼容的私钥/公钥。
 该选项主要用于从多种商业版本的SSH中导入密钥。
 -l 显示公钥文件的指纹数据。它也支持 RSA1 的私钥。
 对于RSA和DSA密钥，将会寻找对应的公钥文件，然后显示其指纹数据。
 -M memory
 指定在生成 DH-GEXS 候选素数的时候最大内存用量(MB)。
 -N new_passphrase
 提供一个新的密语。
 -P passphrase
 提供(旧)密语。
 -p 要求改变某私钥文件的密语而不重建私钥。程序将提示输入私钥文件名、原来的密语、以及两次输入新密语。
 -q 安静模式。用于在 /etc/rc 中创建新密钥的时候。
 -R hostname
 从 known_hosts 文件中删除所有属于 hostname 的密钥。
 这个选项主要用于删除经过散列的主机(参见 -H 选项)的密钥。
 -r hostname
 打印名为 hostname 的公钥文件的 SSHFP 指纹资源记录。
 -S start
 指定在生成 DH-GEX 候选模数时的起始点(16进制)。
 -T output_file
 测试 Diffie-Hellman group exchange 候选素数(由 -G 选项生成)的安全性。
 -t type
 指定要创建的密钥类型。可以使用：”rsa1″(SSH-1) “rsa”(SSH-2) “dsa”(SSH-2)
 -U reader
 把现存的RSA私钥上传到智能卡 reader
 -v 详细模式。ssh-keygen 将会输出处理过程的详细调试信息。常用于调试模数的产生过程。
 重复使用多个 -v 选项将会增加信息的详细程度(最大3次)。
 -W generator
 指定在为 DH-GEX 测试候选模数时想要使用的 generator
 -y 读取OpenSSH专有格式的公钥文件，并将OpenSSH公钥显示在 stdout 上。 
 
~~~

我们常用的参数基本上是下面几个:

-t：指定要创建的密钥类型。可以使用：”rsa1″(SSH-1) “rsa”(SSH-2) “dsa”(SSH-2)；默认是RSA

-b：指定密钥长度。对于RSA密钥，最小要求768位，默认是2048位。DSA密钥必须恰好是1024位(FIPS 186-2 标准的要求)。

-f ：指定密钥文件名

-C：指定密钥注释

在命令行工具中输入“ssh-keygen -t rsa -b 4096 -C “192.168.1.1”” 提示以下信息，这里我设置密钥位数为4096默认为2048

~~~
Microsoft Windows [版本 6.1.7601]
版权所有 (c) 2009 Microsoft Corporation。保留所有权利。

C:\Users\Administrator>ssh-keygen -t rsa -b 4096 -C "192.168.1.1"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/Administrator1/.ssh/id_rsa): key #这里输入文件名windows下必须输入，如果不输入会出现错误
Enter passphrase (empty for no passphrase):#输入密钥密语可以理解成密钥的密码，可以不输入
Enter same passphrase again:#再次输入密钥密码
Your identification has been saved in key.
Your public key has been saved in key.pub.
The key fingerprint is:
SHA256:Ke9MH5QsT19TJqQgimryAn27Vp+MuIFeIff/2VL6hQE 192.168.1.1
The key's randomart image is:
+---[RSA 4096]----+
|    . .  . |
|   . . . . o  |
|  . .  E . . o|
| . .   o o  + |
|o = + . S = . o |
|.+ = +.o = ..+ . |
|. o +o.+o.ooo . |
| o .oo.=+.o+ .  |
| ..o. +.+oo  |
+----[SHA256]-----+

C:\Users\Administrator>
~~~

**Linux服务器SSH设置**

生成密钥对后还需要把公钥即我们刚才生成的key.pub文件上传到linux服务器上

注意：上传位置是我们登录Linux所用用户的家目录下的.ssh目录下

如果目录不存在，需要创建~/.ssh目录，并把目录权限设置为700），

把公钥改名为authorized_keys，并且把它的用户权限设成600

如：`/root/.ssh/`(没有的话使用)

~~~
ssh localhost
~~~

然后把我们上传的key.pub文件改名为：`authorized_keys`

```javascript
[root@server ~]# mv key.pub authorized_keys
[root@server ~]# chmod 700 .ssh
[root@server ~]# chmod 600 authorized_keys
```