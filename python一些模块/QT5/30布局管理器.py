# 0. 导入需要的包和模块
import sys
from PyQt5.QtWidgets import *
class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("控件布局")
        self.resize(500, 500)
        self.setup_ui()

    def setup_ui(self):
        lbl1 = QLabel('欢迎',self)
        lbl1.setStyleSheet("background-color: red;")
        lbl2 = QLabel('学习', self)
        lbl2.setStyleSheet("background-color: green;")
        lbl3 = QLabel('PyQt5 !', self)
        lbl3.setStyleSheet("background-color: yellow;")
        #不用设置父亲物体
        v_layaout = QBoxLayout(QBoxLayout.Direction.RightToLeft)
        v_layaout.addWidget(lbl1)
        v_layaout.addWidget(lbl2)    
        v_layaout.addWidget(lbl3)    
        #调整间隔
        #(left: int, top: int, right: int, bottom: int)
        v_layaout.setContentsMargins(20,30,40,50)
        #类容编剧
        v_layaout.setSpacing(60)
        #排序
        self
        #这个会设置父亲物体
        self.setLayout(v_layaout)

if __name__ == '__main__':    
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())