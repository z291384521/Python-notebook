from PyQt5.QtWidgets import *
import sys

class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("QLabel的学习")
        self.resize(500, 500)
        self.setup_ui()

    def setup_ui(self):
        self.button()
    def cao():
        print("点我干什么")
    def button(self):
      self.btn = QPushButton('按钮', self)
      self.btn.clicked.connect(self.cao)
if __name__ == '__main__':
     
    app = QApplication(sys.argv)
    window = Window()
    #什么时候写self什么时候不写self
    #让改的名字上面都加上ZRQNB
    def cai(title):
        window.windowTitleChanged.disconnect()
        print("标题改变了",title)
        window.setWindowTitle("zrqNB"+title)
        window.windowTitleChanged.connect(cai)
    
    window.windowTitleChanged.connect(cai)
    window.setWindowTitle("菜菜菜")
   
    window.show()
    sys.exit(app.exec_())