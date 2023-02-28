背景在git拉取代码出现

### 遇到冲突

解决方案
执行git stash（IDEA中的菜单为Stash Changes）命令将工作区恢复到上次提交的内容，同时将本地所做的修改备份到暂存区，这样整个项目就回到了我们修改之前的状态，这时就可以正常git pull了，git pull完成后，执行git stash pop（IDEA中的菜单为Unstash Changes）命令将之前本地做的修改应用到当前工作区。

### 相关命令

git stash
备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到暂存区中。
git pull
拉取服务器上的代码到本地。
git stash pop
从暂存区读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复。
git stash list
显示暂存区中的所有备份，可以利用这个列表来决定从那个地方恢复。
git stash clear
清空暂存区。



~~~shell
命令如下
   2 git pull 出现报错
   3 git stash 进行退回缓存
   5 git pull 更新新的
   6 git stash pop 通过编辑器解决冲突
   7 git add .
   8 git commit -m "解决冲突"
   9 git push
~~~

