# 0. 导入需要的包和模块
import sys
from PyQt5.QtWidgets import *
class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("1231")
        self.resize(500,500)
        self.setup_ui()

    def setup_ui(self):
        label = QLabel(self)
        label.setText("1231")
if __name__ == '__main__':    
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    sys.exit(app.exec_())