#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-12 09:54:26
#@FilePath     : \Python-notebook\git自动更新模块\webui\updater.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-12 16:50:59
import datetime
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
    