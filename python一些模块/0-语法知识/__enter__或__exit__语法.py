

#上下文管理协议,就是咱们打开文件时常用的一种方法:with
# __enter__(self):当with开始运行的时候触发此方法的运行
#
# __exit__(self, exc_type, exc_val, exc_tb):当with运行结束之后触发此方法的运行
#
# exc_type如果抛出异常,这里获取异常的类型
#
# exc_val如果抛出异常,这里显示异常内容
#
# exc_tb如果抛出异常,这里显示所在位置

class Sample:
    def __enter__(self):
        print("In __enter__()")
        return "Foo"

    def __exit__(self, type, value, trace):
         print("In __exit__()")



with Sample() as sample:
    print(sample)
    pass

"""
开发库时，清理资源，关闭文件等等操作，都可以放在 __exit__ 方法当中。
因此，Python的with语句是提供一个有效的机制，
让代码更简练，同时在异常产生时，清理工作更简单。
"""