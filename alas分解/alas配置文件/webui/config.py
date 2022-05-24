from filelock import FileLock

from deploy.utils import *


def poor_yaml_read_with_lock(file):
    if not os.path.exists(file):
        return {}

    with FileLock(f"{file}.lock"):
        return poor_yaml_read(file)


def poor_yaml_write_with_lock(data, file, template_file=DEPLOY_TEMPLATE):
    folder = os.path.dirname(file)
    if not os.path.exists(folder):
        os.mkdir(folder)

    with FileLock(f"{file}.lock"):
        with FileLock(f"{DEPLOY_TEMPLATE}.lock"):
            return poor_yaml_write(data, file, template_file)


class WebuiConfig:
    # web配置方法 开始函数调用
    # 以后 属性注册self.__dict__[key] = value
    # super().__setattr__(key, value) 洋气

    Language = "zh-CN"
    WebuiHost = "0.0.0.0"
    WebuiPort = 22267
    Theme = "default"
    Password = None
    CDN = "false"

    def __init__(self, file=DEPLOY_CONFIG):
        """
        Args:
            file (str): User deploy config.
        """
        self.file = file
        self.config = {}
        self.read()
        self.write()

    def read(self):
        """
        Read and update deploy config, copy `self.configs` to properties.
        """
        # 读文件加锁安全
        self.config = poor_yaml_read_with_lock(DEPLOY_TEMPLATE)
        self.config.update(poor_yaml_read_with_lock(self.file))

        for key, value in self.config.items():
            if hasattr(self, key):
                """
                    Language = "zh-CN"
                    WebuiHost = "0.0.0.0"
                    WebuiPort = 22267
                    Theme = "default"
                    Password = None
                    CDN = "false"
                    创建局部变量
                    方便调用 没有选择直接改 全局变量
                """

                super().__setattr__(key, value)

    def write(self):
        """
        Write `self.config` into deploy config.
        """
        poor_yaml_write_with_lock(self.config, self.file)

    def __setattr__(self, key, value):
        """
        Catch __setattr__, copy to `self.config`, write deploy config.
        """
        super().__setattr__(key, value)
        # 第一次执行的时候  and前面后定避免了 self.config报错
        # key[0].isupper() slef.Language检测的L字符
        #
        if key[0].isupper() and key in self.config:
            self.config[key] = value
            self.write()

    @staticmethod
    def to_bool(value):
        value = value.lower()
        if value == "null" or value == "false" or value == "":
            return False
        return True

    def bool(self, key):
        """
        Args:
            key (str):

        Returns:
            bool: Option is ON or OFF.
        """
        return self.to_bool(self.config[key])
