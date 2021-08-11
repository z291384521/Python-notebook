
'''服务端配置'''
import socket
import re
import multiprocessing
import time

class WSGIServer(object):
    def __init__(self):
        # 1. 创建套接字
        self.tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.tcp_server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

        # 2. 绑定
        self.tcp_server_socket.bind(("", 7890))

        # 3. 变为监听套接字
        self.tcp_server_socket.listen(128)        

    def service_client(self, new_socket):
        """为这个客户端返回数据"""
        request=new_socket.recv(1024).decode("utf-8")
        request_lines = request.splitlines()
        print("")
        print(">"*20)
        print(request_lines)
        #分离请求
        file_name = ""
        ret = re.match(r"[^/]+(/[^ ]*)", request_lines[0])
        if ret:
            file_name = ret.group(1)
            # print("*"*50, file_name)
            if file_name == "/":
                file_name = "/index.html"


    def run_forever(self):
      """用来完成整体的控制"""
      while True:
      # 4. 等待新客户端的链接
       new_socket, client_addr = self.tcp_server_socket.accept()

      # 5. 为这个客户端服务
       p = multiprocessing.Process(target=self.service_client, args=(new_socket,))
       p.start()

       new_socket.close()


def main():
    """控制整体，创建一个web 服务器对象，然后调用这个对象的run_forever方法运行"""
    wsgi_server = WSGIServer()
    wsgi_server.run_forever()



if __name__ == "__main__":
    main()
