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

