from PyQt5.QtWidgets import *
import sys
'''
iswidgetYpe()判断是不是控件类型
inherits(类型)判断物体是否直接或者间接继承某个类
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
        self.btn = QPushButton('按钮', self)
        print(self.btn.isWidgetType())
if __name__ == '__main__':     
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())