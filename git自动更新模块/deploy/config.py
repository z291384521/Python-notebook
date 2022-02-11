#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-10 16:16:49
#@FilePath     : \Python-notebook\git自动更新模块\deploy\config.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-11 10:23:09


import copy

from git自动更新模块.deploy.utils import *


class ExecutionError(Exception):
    pass

class DeployConfig:
    """ 
    这个类是读配置文件的
    """
    def __init__(self,file = DEPLOY_CONFIG) -> None:
        """
        Args:
            file (str): User deploy config.
        """
        self.file = file
        self.config = {}
        self.read()
        self.write()
        self.show_config()
        pass
    def show_config(self):
        hr0("Show deploy config")
        for k,v in self.config.items():
            if k in ('Password', 'ApiToken'):
                continue
            if self.config_template[k] == v:
                continue
            print(f'{k}: {v}')
        
        print(f'Rest of the configs are the same as {DEPLOY_TEMPLATE}')
    
    def read(self):
        self.config = poor_yaml_read(DEPLOY_TEMPLATE)
        self.config_template = copy.deepcopy(self.config)
        self.config.update(poor_yaml_read(self.file))   

    def filepath(self, key):
        """
        Args:
            key (str):

        Returns:
            str: Absolute filepath.
        """
        #返回绝对路径
        return os.path.abspath(os.path.join(self.root_filepath, self.config[key])) \
            .replace(r'\\', '/').replace('\\', '/').replace('\"', '"')
    @cached_property
    def root_filepath(self):
        return os.path.abspath(os.path.join(os.path.dirname(__file__), '../')) \
            .replace(r'\\', '/').replace('\\', '/').replace('\"', '"')
    
    @staticmethod
    def to_bool(value):
        value = value.lower()
        if value == 'null' or value == 'false' or value == '':
            return False
        return True