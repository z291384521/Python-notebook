#/add/000007.html
import re


ret = re.match(r"/add/(\d+)\.html","/add/000007.html")
print(ret.group(1))