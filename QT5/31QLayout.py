'''
QLayout 下面的子类有
QBoxlayout 
'''
# 0. 导入需要的包和模块
import sys
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
        v_layaout.addWidget(lbl2)    
        v_layaout.addWidget(lbl3)
        #把lib2替换成为lib4   
        #lib2并不会消失
        #需要label.hide()
        #删除一个对象 删除引用即可
        v_layaout.replaceWidget(lbl2,lbl4)
        lbl2.destroyed.connect(lambda:print("lbl2被摧毁了"))
        #lbl2.hide() 
        lbl2.setParent(None)      
        #布局嵌套
        lbl5 = QLabel('欢迎',self)
        lbl5.setStyleSheet("background-color: red;")
        lbl6 = QLabel('学习', self)
        lbl6.setStyleSheet("background-color: green;")
        lbl7 = QLabel('PyQt5 !', self)
        lbl7.setStyleSheet("background-color: yellow;")
        lbl8 = QLabel('学会了',self)
        lbl8.setStyleSheet("background-color: green;")
        #创建一个水平布局
        h_layout = QHBoxLayout()
        h_layout.addWidget(lbl5)
        h_layout.addWidget(lbl6)
        h_layout.addWidget(lbl7)        
        #z再垂直布局中插入水平布局
        v_layaout.addLayout(h_layout)
        #清除布局情况
        v_layaout.setEnabled(False)        
if __name__ == '__main__':    
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())