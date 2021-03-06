#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-12 09:54:26
#@FilePath     : \Python-notebook\git自动更新模块\webui\updater.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-18 16:16:47
import builtins
import os

import retry
from logger import logger
import datetime
import subprocess
import threading
from deploy.git import GitManager
from deploy.pip import PipManager
from deploy.config import DeployConfig, ExecutionError
from deploy.utils import DEPLOY_CONFIG, cached_property

class Config(DeployConfig):
    def __init__(self, file=DEPLOY_CONFIG):
        self.file = file
        self.config = {}
        self.read()
        self.write()
    
    def execute(self, command, allow_failure=False):
        """
        Args:
            command (str):
            allow_failure (bool):

        Returns:
            bool: If success.
                Terminate installation if failed to execute and not allow_failure.
        """
        command = command.replace(r'\\', '/').replace('\\', '/').replace('\"', '"')
        print(command)
        error_code = os.system(command)
        if error_code:
            if allow_failure:
                print(f'[ allowed failure ], error_code: {error_code}')
                return False
            else:
                print(f'[ failure ], error_code: {error_code}')
                # self.show_error()
                raise ExecutionError
        else:
            print(f'[ success ]')
            return True

class Updater(Config,GitManager,PipManager):
    def __init__(self, file=DEPLOY_CONFIG):
        super().__init__(file)
        #状态码先赋值为0
        self.state= 0
        self.event: threading.Event = None
    @property
    def delay(self):
        self.read()
        #延迟多少分钟后检查下是不是最新的
        return int(self.config['CheckUpdateInterval'])*60

    @property
    def schedule_time(self):
        self.read()
        #自动更新时间
        t = self.config['AutoRestartTime']
        if t != '':
            #返回更新事件
            return datetime.time.fromisoformat(t)
        else:
            return None    

    @cached_property
    def repo(self):
        return self.config['Repository']

    @cached_property
    def branch(self):
        return self.config['Branch']
    
    def execute_output(self, command) -> str:
        command = command.replace(
            r'\\', '/').replace('\\', '/').replace('\"', '"')
        log = subprocess.run(command, capture_output=True,
                             text=True, encoding='utf8', shell=True).stdout
        return log    
    
    def get_commit(self,revision='', n=1, short_sha1=False):
        """
        revision 查看那个分支
        n=1默认看最前面的一个
        short_sha1前缀缩写        
        """
        ph = 'h' if short_sha1 else 'H'

        log = self.execute_output(
            f'{self.git} log {revision} --pretty=format:"%{ph}---%an---%ad---%s" --date=iso -{n}')

        #为空返回空值 空值 空值
        if not log:
            return None, None, None, None

        logs = log.split('\n')
        logs = list(map(lambda log: tuple(log.split('---')), logs))
        
        if n == 1:
            return logs[0]
            #('9266f3b3', 'LmeSzinc', '2022-02-12 22:48:42 +0800', 'Add: Receive META rewards (#863)')
        else:
            return logs                        
        
    def _check_updata(self) ->bool:
        self.state = 'checking'
        source = 'origin'
        for _ in range(3):
            if self.execute(f'"{self.git}" fetch {source} {self.branch}', allow_failure=True):
                break
        else:
            print("Git fetch failed")
            return False
        log = self.execute_output(
            f'"{self.git}" log --not --remotes={source}/* -1 --oneline')
        if log:
            logger.info(
                f"Cannot find local commit {log.split()[0]} in upstream, skip update")
            return False
        #核心就是两个点 ..对比哈希值得不同
        sha1, _, _, message = self.get_commit(f'..{source}/{self.branch}')

        if sha1:
            logger.info(f"New update avaliable")
            logger.info(f"{sha1[:8]} - {message}")
            return True
        else:
            logger.info(f"No update")
            return False  

    def check_update(self):
        if self.state in (0, 'failed', 'finish'):
            self.state = self._check_update()        
    @retry(ExecutionError, tries=3, delay=5, logger=None)
    def git_install(self):
        return super().git_install()

    @retry(ExecutionError, tries=3, delay=5, logger=None)
    def pip_install(self):
        return super().pip_install()            
    def update(self):
        logger.hr("Run update")
        backup, builtins.print = builtins.print, logger.info
        try:
            self.git_install()
            self.pip_install()
        except ExecutionError:
            builtins.print = backup
            return False
        builtins.print = backup
        return True

    def run_update(self):
        if self.state not in ('failed', 0, 1):
            return
        self._start_update()        