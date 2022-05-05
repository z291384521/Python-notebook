from PyQt5.QtCore import Qt
from PyQt5.QtGui import QCursor, QPixmap
from PyQt5.QtWidgets import *
import sys

app = QApplication(sys.argv)

window =QWidget()

window.setWindowTitle("鼠标形状")
#是个类型其他的百度即可
#window.setCursor(Qt.OpenHandCursor)
pixmap = QPixmap(r"QT5\教程目录\PyQt5(代码)\xxx.png")

pixmap = pixmap.scaled(50,50)
#0,0为左上角 为触发点
qcursor = QCursor(pixmap,0,0)
window.resize(500, 500)
window.setCursor(qcursor)
#清除上面的格式
#window.unsetCursor()
#鼠标进入时候 位置信息
current_cursor  = window.cursor(
)
print(current_cursor.pos())
# 2.3 展示控件
window.show()
# 3. 应用程序的执行, 进入到消息循环
sys.exit(app.exec_())
