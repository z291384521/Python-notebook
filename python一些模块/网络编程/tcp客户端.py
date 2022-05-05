import socket
server_ip = "127.0.0.1"
server_port = 17788
#创建socket关键字
tcp_client_socket= socket.socket(socket.AF_INET,socket.SOCK_STREAM)
#链接服务器
tcp_client_socket.connect((server_ip, server_port))
#输入发送数据
send_data = input("请输入要发送的数据：")
tcp_client_socket.send(send_data.encode("gbk"))
# 接收对方发送过来的数据，最大接收1024个字节
recvData = tcp_client_socket.recv(1024)
print('接收到的数据为:', recvData.decode('gbk'))
# 关闭套接字
tcp_client_socket.close()