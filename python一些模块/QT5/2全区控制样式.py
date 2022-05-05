from PyQt5.QtWidgets import *
import sys

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
        with open("QT5\QObject.qss","r") as f:
         qApp.setStyleSheet(f.read())    

        self.btn = QPushButton('按钮', self)
        self.btn1 = QPushButton('按钮一', self)
        self.label1 = QLabel('标签一', self)
        self.label2 = QLabel('标签二', self)
        self.label1.setObjectName("notice")
        self.label1.setProperty("notice_level","warning")
        self.label2.move(40,40)
        self.label2.setObjectName("notice")
        self.btn.resize(100, 30)
        self.btn.move(100, 30)
        self.btn1.resize(100, 30)
        self.btn1.move(100, 80)
if __name__ == '__main__':     
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())