import socket

def service_to_client(new_socket):
    requeset1 = new_socket.recv(1024)
    print(requeset1)
    #2.准备发消息给浏览器
    response = "HTTP/1.1 200 OK\r\n"
    response += "\r\n"
    response +="hahahaha"
    new_socket.send(response.encode("utf-8"))
    new_socket.close()


def main():
    """用来完成整体的控制"""
    # 1. 创建套接字
    tcp_server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    tcp_server_socket.bind(("",7893))
    tcp_server_socket.listen(128)
    while True:
        new_socket,client_addr=tcp_server_socket.accept()
        service_to_client(new_socket)
        #print(client_addr)
    tcp_server_socket.close()

if __name__ == "__main__":
    main()
