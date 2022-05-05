# 0. 导入需要的包和模块
'''
startTimer(ms, Qt.TimerType) -> timer_id
开启一个定时器
Qt.TimerType 定时器类型
    Qt.PreciseTimer 精确定时器：尽可能保持毫秒准确
    Qt.CoarseTimer  粗定时器：5%的误差间隔
    Qt.VeryCoarseTimer 很粗的定时器：只能到秒级
timer_id
定时器的唯一标识
killTimer(timer_id) 根据定时器ID，杀死定时器
timerEvent()
定时器执行事件
'''
import sys
from PyQt5.QtCore import QObject
from PyQt5.QtWidgets import *
class MyQObject(QObject):
    # def timerEvent(self, QTimerEvent) -> None:
    #     print(QTimerEvent)
    #     return super().timerEvent(self, QTimerEvent)
    def timerEvent(self, a0: 'QTimerEvent') -> None:
        print(a0)
        return super().timerEvent(a0)
class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("定时器")
        self.resize(500, 500)
        self.setup_ui()

    def setup_ui(self):
        # obj = MyQObject(self)

        # #开启定时器后面是毫秒
        # timer_id=obj.startTimer(1000)
        # #关闭定时器
        # obj.killTimer(timer_id)
        label = QLabel(self)
        label.setText("10")
        label.setStyleSheet("font-size:100px")
        #label.setTextFormat()
        # label.setTextInteractionFlags
        label.setFixedSize(100,100)
        label.move(200,200)

if __name__ == '__main__':    
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())