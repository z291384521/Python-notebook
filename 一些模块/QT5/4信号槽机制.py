'''
信号(Signal)和槽(Slot)是Qt中的核心机制, 主要作用在于对象之间进行通讯
信号 当一个控件的状态发生改变时, 向外界发出的信息 
槽 一个执行某些操作的函数/方法

一个信号可以连接多个槽函数
一个信号也可以连接另外一个信号
信号的参数可以是任何Python类型
一个槽可以监听多个信号
'''
# 0. 导入需要的包和模块
import sys
from PyQt5.QtCore import QObject
from PyQt5.QtWidgets import *
class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("还得要个名字")
        self.resize(500, 500)
        self.setup_ui()

    def setup_ui(self):
        #Qobjiect信号
        #objectNameChanged(objectName)对象名称发生改变时发射此信号
        #destroyed(obj)destroyed(obj)
        def obj_name_cao():
            print("名字改变了")
        self.obj =QObject()
        def destory_cao():
            print("对象被释放了")
        self.obj.destroyed.connect(destory_cao)
        self.obj.objectNameChanged.connect(obj_name_cao)
        self.obj.setObjectName("改名字了")
        #阻断信号链接
        self.obj.blockSignals(True)
        self.obj.setObjectName("改名字了2")
        self.obj.blockSignals(False)
        self.obj.setObjectName("改名字了3")
        #取消链接
        self.obj.destroyed.disconnect(destory_cao)
        #返回连接到信号的接收器数量
        print(self.obj.receivers(self.obj.objectNameChanged))
        pass
if __name__ == '__main__':    
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())