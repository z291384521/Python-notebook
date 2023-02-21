### linux中 vi / vim显示行号或取消行号命令

\1. 显示行号

:set number

或者

:set nu

\2. 取消行号显示

:set nu!

\3. 每次打开都显示行号

 修改vi ~/.vimrc 文件，添加：set number

### Linux下vi查找关键字

但是，[Linux](https://so.csdn.net/so/search?q=Linux&spm=1001.2101.3001.7020)这么强大的OS，提供了便捷的命令操作：

1、进入vi中，先按下"ESC"跳转成命令输入模式

2、输入斜杠“/”，这时屏幕会跳转到底部，输入栏出现"/"

3、输入你需要查找的关键字，回车

4、如果要继续查找关键字，输入n

5、向前查找，输入N（大写）

#### vi 查找如何不区分大小写

（1）在查找指令后面额外加上`\c`标志；

（2）首先`:set ic`设置忽略大小写，然后再'/keywords'查找:
如果想改回区分大小写，只需要`:set noic`即可。

注意：ic是ignorecase的缩写，即：
`:set ic` 是 `:set ignorecase`的缩写；
`:set noic` 是 `:set noignorecase`的缩写。