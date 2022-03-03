import sys
from PyQt5.QtWidgets import *

'''
adjustSize() 根据内容自适应大小
setFixedSize() 设置固定尺寸
'''
app = QApplication(sys.argv)

window = QWidget()
window.setWindowTitle("最小尺寸最大尺寸限定")
window.show()
window.resize(500, 500)
#固定大小的值
# window.setFixedSize(500, 500)
window.setMinimumSize(200, 200)
window.setMaximumWidth(800)
window.show()
sys.exit(app.exec_())