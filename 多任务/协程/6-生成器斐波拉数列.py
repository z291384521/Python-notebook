def fib(all_num):
    a, b = 0, 1
    current_num = 0
    while current_num < all_num:
        yield a
        a,b = b,a+b
        current_num += 1
    return "ok...."    

obj2= fib(50)
while True:
    try:
        ret = next(obj2)
        print(ret)
    except Exception as ret:
        #最后一个valuef 返回 return
        print(ret.value)
        break 