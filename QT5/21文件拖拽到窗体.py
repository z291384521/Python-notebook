# -*- coding: utf-8 -*-
# Code By ImportThis 2076966127
# Form implementation generated from reading ui file '文件拖放.ui'
# Code By ImportThis 2076966127
# Created by: PyQt5 UI code generator 5.14.2
# Code By ImportThis 2076966127
# WARNING! All changes made in this file will be lost!
from os import system
from PyQt5 import QtCore, QtWidgets
import winreg, subprocess, os
from PyQt5.QtWidgets import QMessageBox
class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(416, 48)
        self.textEdit = QtWidgets.QTextEdit(Form)
        self.textEdit.setGeometry(QtCore.QRect(10, 10, 301, 27))
        self.textEdit.setAcceptDrops(True)
        self.textEdit.setStyleSheet("font-family:微软雅黑;")
        self.textEdit.setObjectName("textEdit")
        self.textEdit.textChanged.connect(self.editchange)
        self.textEdit.setReadOnly(False)
        self.pushButton = QtWidgets.QPushButton(Form)
        self.pushButton.setGeometry(QtCore.QRect(320, 9, 75, 28))
        self.pushButton.setObjectName("pushButton")
        self.pushButton.clicked.connect(self.open)
        QtCore.QMetaObject.connectSlotsByName(Form)
        key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System")
        Value = winreg.QueryValueEx(key, "EnableLUA")[0]
        if Value == 1:
            path = "SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System"
            key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, path, 0, winreg.KEY_ALL_ACCESS)
            winreg.SetValueEx(key, "EnableLUA", 0, winreg.REG_DWORD, 0)
            QMessageBox.information(Form, "", "即将为您重启电脑.")
            system("shutdown -r -t  10")
        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)
    def editchange(self):
        if 0 == self.textEdit.toPlainText().find('file:///'):
            self.textEdit.setText(self.textEdit.toPlainText().replace('file:///', '').replace("/", "\\"))
    def open(self):
        if os.path.exists(self.textEdit.toPlainText()):
            subprocess.Popen("start " + self.textEdit.toPlainText(), shell = True)
            self.textEdit.clear()
    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "Form"))
        self.pushButton.setText(_translate("Form", "打开"))
if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    Form = QtWidgets.QWidget()
    ui = Ui_Form()
    ui.setupUi(Form)
    Form.show()
    sys.exit(app.exec_())
# Code By ImportThis 2076966127