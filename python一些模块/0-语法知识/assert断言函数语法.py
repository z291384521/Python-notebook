def  zero(s):
    a = int(s)
    assert a > 0,"a超出范围"   #这句的意思：如果a确实大于0，程序正常往下运行
    return a

zero("-2")  #但是如果a是小于0的，程序会抛出AssertionError错误，报错为参数内容“a超出范围”
