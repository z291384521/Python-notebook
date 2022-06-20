#### 运行.gitignore 将文件排除监测

```git
git config --global core.excludesfile .\.gitignore Git
```

#### Git解决Filename too long的问题

```
git config --global core.longpaths true
```

#### 对于大于文件处理上传不上去gitpush问题

```
. git filter-branch --force --index-filter "git rm --cached --ignore-unmatch -r 要删除的文件" --prune-empty --tag-name-filter cat -- --all
```

这句的意思是从[遍历](https://so.csdn.net/so/search?q=遍历&spm=1001.2101.3001.7020)所有的commit，删除那个文件，重写历史commit

然后可以再
git commit --amend