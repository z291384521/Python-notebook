import argparse

if __name__ == "__main__":
    # 获得cmd命令行的参数 py gui.py
    parser = argparse.ArgumentParser(description='Alas web service')
    parser.add_argument('--host', type=str,
                        help='Host to listen. Default to WebuiHost in deploy setting')
    parser.add_argument('-p', '--port', type=int,
                        help='Port to listen. Default to WebuiPort in deploy setting')
    parser.add_argument('-b', '--backend', type=str, default='starlette',
                        help='Backend framework of web server, starlette or tornado. Default to starlette')
    parser.add_argument('-k', '--key', type=str,
                        help='Password of alas. No password by default')
    # action属性 如果写了--cdn则为TRue e(backend='zrq', cdn=True, host='zrq', key='123456', port=5555)
    # backend='zrq', cdn=False, host='zrq', key='123456', port=5555)没写则是False
    parser.add_argument("--cdn", action="store_true",
                        help="Use jsdelivr cdn for pywebio static files (css, js). Self host cdn by default.")
    # 指定-v可选参数时，-v等于v出现的次数
    parser.add_argument("-v", action="count")
    args = parser.parse_args()
    print(args)
