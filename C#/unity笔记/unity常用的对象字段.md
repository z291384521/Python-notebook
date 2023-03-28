### **Range**

```
    [Range(1,100)]
    public int b = 10;
```
float也可以
unity显示为 
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019011413475256.png)



### **SerializeField**

可以把私有数值显示

```
  [SerializeField]
    private bool c = true;
```
#### **HideInInspector**

把共有隐藏

```
   [HideInInspector]
    public float d = 1.0f;
```
unity显示
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190114140505906.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjExNjcwMw==,size_16,color_FFFFFF,t_70)
只有私有的c

### **System.Serializable序列话一个类**

**这个要在类的前面加** 
具体的原理（简单就是将一个类变成一个可存储的对象进行传输 显示）

```
https://blog.csdn.net/tracyly1029/article/details/7072508
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190114140736516.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjExNjcwMw==,size_16,color_FFFFFF,t_70)
然后再![在这里插入图片描述](https://img-blog.csdnimg.cn/20190114140830276.png)

就可以看到
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190114140924919.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjExNjcwMw==,size_16,color_FFFFFF,t_70)

### TextArea

    [TextArea(3, 10)]
    public string[] sentences;
使用高度灵活且可滚动的文本区域编辑字符串的属性。
您可以指定TextArea的最小和最大行，该字段将根据文本的大小进行扩展。如果文本大于可用区域，则会出现滚动条。
MAXLINES	文本区域在开始使用滚动条之前可以显示的最大行数。
的minlines	文本区域将使用的最小行数。