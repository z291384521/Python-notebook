from socket import *
address_ip = ""
address_port = int(17888)


def main():
    # 创建tcp关键字
    tcp_server = socket(AF_INET, SOCK_STREAM)
    #绑定关键字
    tcp_server.bind(address_ip,address_port)
    #将手机设置为正常的 响铃模式
    tcp_server.listen(128)
    #如果有新的客户端来链接服务器，那么就产生一个新的套接字专门为这个客户端服务
    client_socket,clientAddr = tcp_server.accept()
    file_name = client_socket.recv(1024).decode("utf-8")
    print("客户端(%s)需要下载文件是：%s" % (str(client_addr), file_name))

    pass


if __name__ == "__main__":
    main()
