from PyQt5 import QtWidgets
from PyQt5.QtWidgets import *
import sys
class MyLabel(QLabel):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setText("10")
        self.move(200, 200)
        self.setStyleSheet("font-size: 100px;")
    def setSec(self, sec):
        self.setText(str(sec))

    def startMyTimer(self, ms):
        self.timer_id = self.startTimer(ms)

    def timerEvent(self, *args, **kwargs):
        print("xx")
        # 1. 获取当前的标签的内容
        current_sec = int(self.text())
        current_sec -= 1
        self.setText(str(current_sec))

        if current_sec == 0:
            print("停止")
            self.killTimer(self.timer_id)
class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("定时器")    

# 1. 创建一个应用程序对象
app = QApplication(sys.argv)


# 2. 控件的操作
# 2.1 创建控件
window = Window()
# 2.2 设置控件
window.setWindowTitle("QObject定时器的使用")
window.resize(500, 500)
window.startTimer(100)
label = MyLabel(window)
label.setSec(10)
label.startMyTimer(500)
# 2.3 展示控件
window.show()
# 3. 应用程序的执行, 进入到消息循环
sys.exit(app.exec_())