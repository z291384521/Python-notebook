#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-11 15:21:24
#@FilePath     : \Python-notebook\git自动更新模块\deploy\git.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-11 17:43:05


from config import DeployConfig
from utils import *


class GitManager(DeployConfig):
    @cached_property
    def git(self):
        #返回配置表中git软件位置
        return self.filepath('GitExecutable')
    def git_repository_init(self, repo, source='origin', branch='master', proxy='', keep_changes=False):
        hr1('Git Init')
        self.execute(f'"{self.git}" init')

        hr1('Set Git Proxy')
        if self.to_bool(proxy):
            self.execute(f'"{self.git}" config --local http.proxy {proxy}')
            self.execute(f'"{self.git}" config --local https.proxy {proxy}')
        else:
            self.execute(f'"{self.git}" config --local --unset http.proxy', allow_failure=True)
            self.execute(f'"{self.git}" config --local --unset https.proxy', allow_failure=True)

        hr1('Set Git Repository')
        if not self.execute(f'"{self.git}" remote set-url {source} {repo}', allow_failure=True):
            self.execute(f'"{self.git}" remote add {source} {repo}')

        hr1('Fetch Repository Branch')
        self.execute(f'"{self.git}" fetch {source} {branch}')

        hr1('Pull Repository Branch')
        if keep_changes:
            if self.execute(f'"{self.git}" stash', allow_failure=True):
                self.execute(f'"{self.git}" pull --ff-only {source} {branch}')
                if self.execute(f'"{self.git}" stash pop', allow_failure=True):
                    pass
                else:
                    # No local changes to existing files, untracked files not included
                    print('Stash pop failed, there seems to be no local changes, skip instead')
            else:
                print('Stash failed, this may be the first installation, drop changes instead')
                self.execute(f'"{self.git}" reset --hard {source}/{branch}')
                self.execute(f'"{self.git}" pull --ff-only {source} {branch}')
        else:
            self.execute(f'"{self.git}" reset --hard {source}/{branch}')
            self.execute(f'"{self.git}" pull --ff-only {source} {branch}')

        hr1('Show Version')
        self.execute(f'"{self.git}" log --no-merges -1')

    def git_install(self):
        hr0('更新我的程序')

        if not self.bool('AutoUpdate'):
            print('AutoUpdate is disabled, skip')
            return

        self.git_repository_init(
            repo=self.config['Repository'],
            source='origin',
            branch=self.config['Branch'],
            proxy=self.config['GitProxy'],
            keep_changes=self.bool('KeepLocalChanges')
        )
GitManager_updata = GitManager()
GitManager_updata.git_install()