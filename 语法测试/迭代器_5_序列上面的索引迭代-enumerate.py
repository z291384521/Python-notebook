my_list =["a","b","c"]
#想要获得索引
for idx , val in enumerate(my_list):
    print(idx,val)

data = [(1,2),(3,4),(5,6),(7,8)]
for n,(x,y) in enumerate(data):
    print(n,(x,y))


# for n,x,y in enumerate(data):报错
#     print(n,x,y)