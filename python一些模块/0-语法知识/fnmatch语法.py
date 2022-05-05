#fnmatch 模块主要用于文件名称的匹配，其能力比简单的字符串匹配更强大，
# 但比使用正则表达式相比稍弱。。如果在数据处理操作中，
# 只需要使用简单的通配符就能完成文件名的匹配，
# 则使用 fnmatch 模块是不错的选择。
# fnmatch.filter(names, pattern)	        对 names 列表进行过滤，返回 names 列表中匹配 pattern 的文件名组成的子集合。
# fnmatch.fnmatch(filename, pattern)        判断 filename 文件名，是否和指定 pattern 字符串匹配
# fnmatch.fnmatchcase(filename, pattern)	和 fnmatch() 函数功能大致相同，只是该函数区分大小写。
# fnmatch.translate(pattern)	            将一个 UNIX shell 风格的 pattern 字符串，转换为正则表达式

import fnmatch
#filter() 例子
print(fnmatch.filter(['dlsf', 'ewro.txt', 'te.py', 'youe.py'], '*.txt'))
#['ewro.txt']

#fnmatch()
for file in ['word.doc','index.py','my_file.txt']:
    if fnmatch.fnmatch(file,'*.txt'):
        print(file)
#my_file.txt

print([addr for addr in ['word.doc','index.py','my_file.txt','a.TXT'] if fnmatch.fnmatchcase(addr, '*.txt')])
#只有小写字符串
#my_file.txt'


print([addr for addr in ['word.doc','index.py','my_file.txt','a.TXT'] if fnmatch.fnmatchcase(addr, '*.txt')])
#(?s:a.*b\.txt)\Z
