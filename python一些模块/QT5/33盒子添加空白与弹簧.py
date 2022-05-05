'''
用于添加不规则的间距
'''
# 0. 导入需要的包和模块
import sys
from PyQt5.QtCore import QTime, QTimer
from PyQt5.QtWidgets import *
class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("替换注意事项")
        self.resize(500, 500)
        self.setup_ui()

    def setup_ui(self):
        lbl1 = QLabel('欢迎',self)
        lbl1.setStyleSheet("background-color: red;")
        lbl2 = QLabel('学习', self)
        lbl2.setStyleSheet("background-color: green;")
        lbl3 = QLabel('PyQt5 !', self)
        lbl3.setStyleSheet("background-color: yellow;")
        lbl4 = QLabel('学会了',self)
        lbl4.setStyleSheet("background-color: green;")
        
        #创建一个布局管理器对象
        v_layaout = QVBoxLayout()
        #将布局管理器给需要布局的父控件
        self.setLayout(v_layaout)
        #把子物体控件添加到布局管理器中
        v_layaout.addWidget(lbl1)
        v_layaout.addSpacing(100)
        v_layaout.addWidget(lbl2)    
        v_layaout.addWidget(lbl3)

if __name__ == '__main__':    
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())