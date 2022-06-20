## 遇到的命令
#### git pull 

#### --ff

ff 意思是 fast-forward, 使用 merge 时，默认会使用 fast-forward 的方式合并代码

如果合并的分支（master）是被合并分支（feature）的上游分支，则合并成功，不会产生 merge log，

如果合并的分支（master）不是被合并分支（feature）的直接上游分支（比如 master 在 checkout 出 feature 分支后，又进行了几次提交），不能使用 fast-forward 的方式合并代码，git 会进行一次三方合并（magic）,如果合并成功，就会产生一个 merge log, 如果有冲突产生，则合并失败，需要解决冲突并 commit 后才能合并.

#### –no-ff

如果加上 --no-ff 参数，就是默认使用三方合并的方式合并，就算合并的分支（master）是被合并分支（feature）的上游分支，也会产生一个 merge log
这种做法的好处是，忠实地记录了实际发生过什么，关注点在真实的提交历史上面

#### –ff-only

与 --no-ff 相反，--ff-only 表示只接受 fast-forward 方式的合并，如果不能直接使用 fast-forward 合并，会合并失败并报错

### git log

//查看合并提交
git log --merges

//查看非合并提交
git log --no-merges



git log --oneline
--oneline参数可以将每条日志的输出为一行，如果日志比较多的话，
用这个参数能够使结果看起来比较醒目。
为了节约日志的篇幅，**会频繁地使用这个参数。**



git log ..origin/master 与git log origin/master  区别

**git log ..origin/master**

..是比较与本地的哈希值区别 返回不一样的commit

**git log origin/master**

git log origin/master 单纯查日志

