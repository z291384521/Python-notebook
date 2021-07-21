#Python里数量词默认是贪婪的
'''
'''
import re
s="This is a number 234-235-22-423"
r=re.search("(.+)(\d+-\d+-\d+-\d+)",s)
print(r.group(1))
print(r.group(2))
s="This is a number 234-235-22-423"
r=re.search("(.+?)(\d+-\d+-\d+-\d+)",s)
print(r.group(1))
print(r.group(2))

