#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-11 15:14:32
#@FilePath     : \Python-notebook\git自动更新模块\deploy\updater.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-11 15:20:38
import os
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




