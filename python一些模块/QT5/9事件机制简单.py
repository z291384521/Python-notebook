'''
0 用户的操作会产生各种各样事件消息
1 第一个接收到消息的是操作系统 操作系统会将消息分发到相对应的应用程序消息队列中
3 应用程序会有一个消息循环 app.exec_()开启的 
    不断的按照顺序检测消息队列中是否有消息
    如果发现消息 则会包装成“Qevnt对象”进行分发处理 事件接受者（receiver）和事件对象 evt传递QApplication对象的notify(receiver,evt)方法

4判断下 QApplication有没有过滤器 事件接受者QObject有没有过滤器 
5分发给QObject的evet（还会进行一次分发 再发射一次信号来执行对应槽里面方法）
去执行相对应函数

'''
import sys
from PyQt5 import QtCore
from PyQt5.QtWidgets import *

#为了看事件机制
class App(QApplication):
    def notify(self, a0: QtCore.QObject, a1: QtCore.QEvent) -> bool:
        #print("事件对象名称",a0,"对象事件",a1)
        #做一个筛选 方便看一下类容
        if a0.inherits("QPushButton") and a1.type() == QtCore.QEvent.MouseButtonPress:
            print("事件对象名称",a0,"对象事件",a1)
        return super().notify(a0, a1)

class Btn(QPushButton):
    def event(self, e: QtCore.QEvent) -> bool:
        if e.type() ==QtCore.QEvent.MouseButtonPress:
            print(e)
        return super().event(e)

app = App(sys.argv)
window = QWidget()
btn = Btn(window)
btn.setText("按钮")
btn.move(100, 100)

def cao():
    print("按钮被点击了")

btn.pressed.connect(cao)

window.show()
sys.exit(app.exec_())