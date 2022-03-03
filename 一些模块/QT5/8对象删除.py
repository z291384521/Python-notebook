from PyQt5.QtCore import QObject
from PyQt5.QtWidgets import *
import sys
'''
删除一个对象时, 也会解除它与父对象之间的关系
deleteLater()并没有将对象立即销毁，而是向主消息循环发送了一个event，
这样做的好处是可以在这些延迟删除的时间内完成一些操作，坏处就是内存释放会不及时


del就是斩断对象名字与指向内存的联系
'''
class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("QLabel的学习")
        self.resize(500, 500)
        self.setup_ui()

    def setup_ui(self):
        self.qss_style()
        pass
    def qss_style(self):
        
        obj1 = QObject()
        #有个引用让obj1不会轻易消失
        self.obj1 = obj1
        obj2 = QObject()
        obj3 = QObject()
        #结构图为obj3为孙子obj2为父亲obj1爷爷
        obj3.setParent(obj2)
        obj2.setParent(obj1)
       

        obj1.destroyed.connect(lambda:print("obj1被释放了"))
        obj2.destroyed.connect(lambda:print("obj2被释放了"))
        obj3.destroyed.connect(lambda:print("obj3被释放了"))
        del obj2 #不会触发事件销毁事件 删除的是联系
        obj2.deleteLater()
        print(obj1.children())
if __name__ == '__main__':     
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())