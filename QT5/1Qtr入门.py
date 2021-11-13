import sys
# 控件窗口
from PyQt5.QtWidgets import QMainWindow, QApplication, QDesktopWidget, qApp
# 图标
from PyQt5.QtGui import QIcon

'''
1.一个PyQt程序都需要一 个应用程序对象 
它包含主事件循环，在其中来自窗口系统和其它资源的所有事件被处理和调度。
它也处理应用程序的初始化和结束，并且提供对话管理。
它也处理绝大多数系统范围和应用程序范围的设置。

2控件操作
2.1 创建控件
    windows =QWidget()
2.2设置控件 

2.3展示控件
#刚创建好一个控件之后（这个控件没有什么父控件） 默认情况下不会被展示 只有手动调用才行show方法（）
window.show()
如果说没有父控件 则把它当成的顶层控件（窗口）
控件也可以作为容器（承载其他的容器）
label  = QLabel()

2. app.exec ()意思是让程序进入主循环，不要停止
'''
class FirstMainWin(QMainWindow):
    def __init__(self):
        super(FirstMainWin, self).__init__()
        # 设置主窗口的标题
        self.setWindowTitle('第一个主窗口应用')
        # 设置窗口的尺寸
        self.resize(400, 300)
        self.status = self.statusBar()
        self.status.showMessage('只存在5秒的消息', 5000)
        #self.center()
    def center(self):
        # 获取屏幕坐标系
        screen = QDesktopWidget().screenGeometry()
        # 获取窗口坐标系
        size = self.geometry()
        newLeft = (screen.width() - size.width()) / 2
        newTop = (screen.height() - size.height()) / 2
        self.move(newLeft, newTop)


if __name__ == '__main__':
    #QApplication
    # 提供了整个图形界面程序的底层管理功能，比如：
    # 初始化、程序入口参数的处理，用户事件
    # （对界面的点击、输入、拖拽）分发给各个对应的控件
    # 我们必须在任何界面控件对象创建前，先创建它。
    #sys.argv 是为了在命令行中启动程序的时候 可以用来接收传来的值
    app = QApplication(sys.argv)
    #获取里面的参数 QApplication 在源码中帮我们生成一个 qAPP全局变量
    
    print(qApp.arguments())
    app.setWindowIcon(QIcon('./images/Dragon.ico'))
    main = FirstMainWin()
    main.show()
    # sys.exit传递退出码 就是退出的时候给一个参数
    #一般 0是正常退出  1就报错
    # app.exec_()应用程序的执行，进入到消息循环
    #让整个程序开始执行,并且进入到消息循环(无限循环)
    #检测整个程序所接收到的用户的交互信息
    print(app.exec_())
    sys.exit(app.exec_())


    