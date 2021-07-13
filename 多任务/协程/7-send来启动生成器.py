from typing import NewType


def fib(all_num):
    a, b = 0, 1
    current_num = 0
    while current_num < all_num:
        #ret接收send发送的值
        ret = yield a
        print(">>>>>ret<<<<<",ret)
        a,b = b,a+b
        current_num += 1
    return "ok...."    

obj = fib(50)
#第一次调用 必须是next
ret = next(obj)
print("第1次打印",ret)
ret = obj.send("hahhahah")
print("第2次打印",ret)
ret = obj.send("111111")
print("第3次打印",ret)
ret = next(obj)
print("第4次打印",ret)