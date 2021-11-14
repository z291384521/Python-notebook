from PyQt5.QtWidgets import *
import sys
'''
给里面Laber加属性
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
        self.btn1 = QPushButton('按钮一', self)
        self.label1 = QLabel('标签一', self)
        self.label2 = QLabel('标签二', self)
        self.label1.setObjectName("notice")
        self.label1.setProperty("notice_level","warning")
        self.label2.move(0,40)
        self.label2.setObjectName("notice")
        self.btn.resize(100, 30)
        self.btn.move(100, 30)
        self.btn1.resize(100, 30)
        self.btn1.move(100, 80)
        #
        for widgget in self.children():
            if widgget.inherits("QLabel"):
                widgget.setStyleSheet("background-color:red")
if __name__ == '__main__':     
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())