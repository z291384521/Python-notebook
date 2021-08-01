import copy

a=[11,22]
b=copy.deepcopy(a)
a.append(33)
print(a,b)