from socket import *
#链接信息
dest_ip = "127.0.0.1"
dest_port = int(17888)
download_file_name = "test.txt"
def main():
    #创建嵌套
    tcp_client=socket(AF_INET,SOCK_STREAM)
    #发送文件名
    tcp_client.send(download_file_name.encode("utf-8"))
    # 6. 接收文件中的数据
    recv_data = tcp_socket.recv(1024)
    #写文件 如果不为空
    if recv_data:
        with open("[新]"+download_file_name,'wb') as f:
            f.write(recv_data)
    tcp_client.close()


if __name__ == "__main__":
    main()    