# 输入文本路径


test = open("test.txt")
con = test.readlines()
print(con)
while True:
    hang = test.readline()
    if not hang:
        break
    #为啥使用这个因为已经读了一个aaa/n
    print(hang,end="")
test.close()

print("111")
print("222")
