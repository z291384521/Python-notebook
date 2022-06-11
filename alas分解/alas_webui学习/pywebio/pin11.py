
from pywebio.pin import put_input
from pywebio.output import put_buttons
from pywebio.output import put_text
from pywebio.pin import pin, pin_wait_change
from pywebio import *
"""
我们已经知道，PyWebIO中的输入函数是阻塞式的，输入表单会在成功提交后被销毁。
在大多数场景下，使用这种方式接收用户输入已经够用了。但在一些场景下，
你或许希望输入表单在提交后不消失，并且可以继续接收输入。
所以，PyWebIO提供了 pin 模块来实现持续性输入。
"""
def main():


 put_input('pin_name')
 put_buttons(['Get Pin Value'], lambda _: put_text(pin.pin_name))
 

start_server(main, port=8085, debug=True)
