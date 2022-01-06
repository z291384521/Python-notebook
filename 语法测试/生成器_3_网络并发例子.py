from collections import deque
#select主要用于socket通信当中，能监视我们需要的文件描述变化
from select import select










if __name__ == '__main__':
    from socket import socket, AF_INET, SOCK_STREAM
    import time
    def readline(sock):
        chars = []
        while True:
            c = yield sock.recv(1)
            if not c:
                break
            chars.append(c)
            if c == b'\n':
                break
        return b''.join(chars)