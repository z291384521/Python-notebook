#步骤如下
#1打开文件
#2读写文件
#3关闭文件
#open(name,open)
#name:是要打开的目标文件名的字符串(可以包含文件所在的具体路径)。
#mode:设置打开文件的模式(访问模式):只读、写入、追加等。
# r: 如果文件不存在，报错；不支持写入操作，表示只读
# f = open('test1.txt', 'r')
# f = open('test.txt', 'r')
# f.write('aa')
# f.close()

# w：只写, 如果文件不存在，新建文件；执行写入，会覆盖原有内容
# f = open('1.txt', 'w')
# f.write('bbb')
# f.close()

# a：追加，如果文件不存在，新建文件；在原有内容基础上，追加新内容
# f = open('2.txt', 'a')
# f.write('xyz')
# f.close()

# 访问模式参数可以省略, 如果省略表示访问模式为r
# f = open('1.txt')
# f.close()

#r+ 以读写方式打开文件。文件的指针将会放在文件的开头。如果文件不存在，抛出异常
#w+ 以读写方式打开文件。如果文件存在会被覆盖。如果文件不存在，创建新文件
#a+ 以读写方式打开文件。如果该文件已存在，文件指针将会放在文件的结尾。如果文件不存在，创建新文件进行写入
#●频繁的移动文件指针，会影响文件的读写效率，开发中更多的时候会以只读、只写的方式来操作文件





#num表示要从文件中读取的数据的长度(单位是字节)，如果没有传入num,那么就表示读取文num表示要从文件中读取的数据的长度(单位是字节)，
#如果没有传入num,那么就表示读取文件中所有的数据。
# file =open("test.txt")
# text  =file.read()
# print(text)
#readlines
f = open('test.txt', 'r+')
con = f.readlines()
print(con)
f.close()
#readline 一行一行读取
f = open('test.txt', 'r')
con = f.readline()
print(con)
con = f.readline()
print(con)
con = f.readline()
print(con)
f.close()
#文件指针
#●文件指针标记从哪个位开始读取数据
#●第一次打开文件时，通常文件指针会指向文件的开始位置
#●当执行了read方法后，文件指针会移动到读取内容的末尾
file =open("test.txt")
text  =file.read()
print(text)
print(len(text))
print("-"*50)
text  =file.read()
#打印不出来
print(text)
print(len(text))