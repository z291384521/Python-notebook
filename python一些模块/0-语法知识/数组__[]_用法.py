"""
python中 [ ] 的使用方法
[-1]
取最后一个元素

[:-1]
取除了最后一个元素的所有元素

[::-1]
对元素进行逆序读取

[n::-1]
从下标为n的元素开始（下标从0开始计数）逆序排列读取

b=a[i：j]
生成新的list对象，内容为 a[i] 到 a[j - 1]

当i缺省
默认为0

当j缺省
默认为 len(list)

出现负数
负数在冒号左侧 [-x :]
取后x个数

负数在冒号右侧 [: -x]
除了后x个数以外的数
————————————————
版权声明：本文为CSDN博主「weixin_45938096」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45938096/article/details/105864378
"""