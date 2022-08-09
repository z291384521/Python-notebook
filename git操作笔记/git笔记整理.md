## 原理

![image-20220611122528058](img/git笔记整理/image-20220611122528058.png)

Workspace：工作区
Index / Stage：暂存区
Repository：仓库区（或本地仓库）
Remote：远程仓库

## 初级篇

### git

安装git 没啥好说的下一步点击即可

git init 初始化 仓库 本地部分搭建完毕

/.git就是储存信息的文件

####  工作区中文件的 4 种状态

![image-20220809173734980](img/git笔记整理/image-20220809173734980.png)

##### 查看状态

可以使用 git status 命令查看文件处于什么状态

git status -short

未跟踪文件前面有<font color="red">红色的</font> ?? 标记

修改过的、没有放入暂存区的文件前面有红色的 M 标记

![image-20220809174158106](img/git笔记整理/image-20220809174158106.png)

##### 跟踪新文件

git add 开始跟踪一个文件

![image-20220809174422639](img/git笔记整理/image-20220809174422639.png)

以精简的方式显示文件的状态： 新添加到暂存区中的文件前面有绿色的 A 标记

git add .

将新增和修改过后的文件加入暂存区

##### 提交更新

git commit 命令进行提交, 其中 -m 选项后面是本次的提交消息

##### 取消暂存的文件

如果需要从暂存区中移除对应的文件

git reset HEAD要移除的文件名称

##### 跳过使用暂存区域

Git 提供了一个跳过使用暂存区域的方式， 只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把 所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：

~~~
git commit -a -m "描述消息"
~~~

##### 移除文件

从 Git 仓库中移除文件的方式有两种： 

① 从 Git 仓库和工作区中同时移除对应的文件

~~~
git rm -f index.js
~~~



② 只从 Git 仓库中移除指定的文件，但保留工作区中对应的文件

~~~
git rm --cached index.js
~~~





#### .gitconfig Git 的全局配置文件

~~~
通过 git config --global user.name 和 git config --global user.email 配置的用户名和邮箱地址，会被写
入到 
C:/Users/用户名文件夹/.gitconfig 文件中。这个文件是 Git 的全局配置文件，配置一次即可永久生效。
~~~

#### .gitignore 忽略文件

① 以 # 开头的是注释

 ② 以 / 结尾的是目录 

③ 以 / 开头防止递归 

④ 以 ! 开头表示取反 

⑤ 可以使用 glob 模式进行文件和文件夹的匹配（glob 指简化了的正则表达式）



所谓的 glob 模式是指简化了的正则表达式：

① 星号 * 匹配零个或多个任意字符 

② [abc] 匹配任何一个列在方括号中的字符 （此案例匹配一个 a 或匹配一个 b 或匹配一个 c）

③ 问号 ? 只匹配一个任意字符

④ 在方括号中使用短划线分隔两个字符， 表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配 所有 0 到 9 的数字） ⑤ 两个星号 ** 表示匹配任意中间目录（比如 a/**/z 可以匹配 a/z 、 a/b/z 或 a/b/c/z 等）

### github

下载ssh生成计算机密钥

ssh-keygen -t rsa –C “邮箱”

id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人

登录github,打开” settings”中的SSH Keys页面，然后点击“Add SSH Key”,填上任意title，

![image-20220611122621778](img/git笔记整理/image-20220611122621778.png)

在Key文本框里黏贴**id_rsa.pub**文件的内容。

创建一个仓库

然后本地与远程仓库关联

git remote add origin https://github.com/z291384521/zzzzzzzzzzzzzzz.git

git push -u origin master

我们第一次推送master分支时，加上了 –u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

#### 如何摆脱关联删除远程仓库命令

1、先输⼊$ git remote rm origin(删除关联的origin的远程库)
2、再输⼊$ git remote add origin **************:(github名)/(git项⽬名).git 就不会报错了！
3、如果输⼊$ git remote rm origin 还是报错的话，error: Could not remove config section 'remote.origin'. 我们需要修改gitconfig⽂
件的内容
4、找到你的github的安装路径，我的是找到⼀个名为gitconfig的⽂件，打开它把⾥⾯的[remote "origin"]那⼀⾏删掉就好了！





