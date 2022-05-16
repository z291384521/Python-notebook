通过 git 的 pre-commit 挂勾来在提交前进行一次检查, 我们可以把下面的脚本存在 代码仓库的根目录下的 ./git/hooks, 文件名为 pre-commit.

pre-commit 用到一个配置文件： `.pre-commit-config.yaml`，官方文档在[这里](https://link.zhihu.com/?target=https%3A//pre-commit.com/)。这里针对 Python 项目，希望 git precommit hooks 能够实现以下功能：能找出不符合 pep8规范的代码，并且能够自动格式化。这需要用到两个工具： `black`和 `flake8`， `black`自动格式化， `flake8`检测代码不规范的地方。

整个的 workflow 如下图所示：

![img](pre commit hook.assets/v2-7a861b87d043c0c4f9896ac3dd96776c_720w.jpg)



具体的执行步骤如下：

1. 安装 pre-commit : `pip install pre-commit`

2. 写 `.pre-commit-config.yaml`配置文件

3. 用 `pre-commit install`

   安装git hooks到你的 `.git/`目录

我们的 `.pre-commit-config.yaml`很简单，如下：









我们还可以通过以下设置来关闭这个检查.

```
git config hooks.allowonlytests true
```

`git commit --no-verify` 来绕过这个环节