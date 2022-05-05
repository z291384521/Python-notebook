#功能 旧的列表  -------》 新的列表
# 1.列表推导式： 格式：[表达式 for 变量 in 旧列表]
# 或者[表达式 for 变量 in 旧列表 if 条件]
names = ['tomcat', 'a', '1', 'boo', 'abc', 'jacklove']
names1 = [name for name in names if len(name) > 3]
print(names1)
#集合推导式
#如果有else判断写在前面
doct1 = {"name": "tom", "salary": 5000}
doct2 = {"name": "lucy", "salary": 4000}
doct3 = {"name": "jack", "salary": 3000}
doct4 = {"name": "lily", "salary": 6000}
list1 = [doct1, doct2, doct3, doct4]
x = [
    doct["salary"] + 200 if doct["salary"] > 5000 else doct["salary"] + 5000
    for doct in list1
]
print(x)
#字典推导式
#互换
diet1 = {'a': 'A', 'b': 'B', 'c': 'C', 'd': 'C'}
newdiet1 = {value: key for key, value in diet1.items()}
print(newdiet1)
