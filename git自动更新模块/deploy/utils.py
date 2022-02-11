#!/usr/bin/env python
# coding=utf-8
#@Information:
#@Author       : 反转旋木
#@Date         : 2022-02-10 16:37:40
#@FilePath     : \Python-notebook\git自动更新模块\deploy\utils.py
#@Email        : 291384521@qq.com
#@LastEditTime : 2022-02-11 09:49:52
import re
import os

DEPLOY_CONFIG = r"git自动更新模块\config\deploy.yaml"
DEPLOY_TEMPLATE = r"git自动更新模块\config\deploy copy.yaml"
class cached_property:
    """
    这个属性有缓存了不会再次调用方法体直接给返回值
    cached-property from https://github.com/pydanny/cached-propert
    A property that is only computed once per instance and then replaces itself
    with an ordinary attribute. Deleting the attribute resets the property.
    Source: https://github.com/bottlepy/bottle/commit/fa7733e075da0d790d809aa3d2f53071897e6f76
    """
    
    def __init__(self, func):
        self.func = func

    def __get__(self, obj, cls):
        if obj is None:
            return self

        value = obj.__dict__[self.func.__name__] = self.func(obj)
        return value

def poor_yaml_read(file):
    "返回读到的字典内容"
    if not os.path.exists(file):
        return {}
    
    data ={}
    regex = re.compile(r"^(.*?):(.*?)$")
    with open(file,"r",encoding="utf-8") as f:
        for line in f.readlines():
            line = line.strip('\n\r\t ').replace('\\', '/')
            #开头字母为#舍弃
            if line.startswith('#'):
                continue
            result = re.match(regex, line)
            if result:
                k, v = result.group(1), result.group(2).strip('\n\r\t\' ')
                if v:
                    if v == 'null':
                        v = ''
                    data[k] = v
    return data

def poor_yaml_write(data,file,template_file=DEPLOY_TEMPLATE):
    """
    Args:
        data (dict):
        file (str):
        template_file (str):
    """
    with open(template_file,"r",encoding="utf-8") as f:
        text = f.read().replace('\\','/')
        
    for key,value in data.items():
        if value == '':
            value='null'
        text = re.sub(f'{key}:.*?\n',f'{key}: {value}\n', text)

    with  open(file, 'w', encoding='utf-8') as f:
        f.write(text)
        
def hr1(title):
    print('=' * 20 + ' ' + title + ' ' + '=' * 20)


def hr0(title):
    middle = '|' + ' ' * 20 + title + ' ' * 20 + '|'
    border = '+' + '-' * (len(middle) - 2) + '+'
    print(border)
    print(middle)
    print(border)

if __name__ == '__main__':

    data=poor_yaml_read(DEPLOY_CONFIG)
    data['Repository']='https://github.com/z291384521/Python-notebook.git'
    print(data)
    poor_yaml_write(data,DEPLOY_CONFIG,template_file=DEPLOY_TEMPLATE)
    print(poor_yaml_read(DEPLOY_CONFIG))
    pass