执行阶段为

rewrite >access -> content 

![image-20220611103516484](nginx执行顺序.assets/image-20220611103516484.png)

deny为阻止一切访问

这样进行访问/demo4 还是可以访问到 echo里面

应为 配置写在前面与后面没有关系 优先执行 rewrite 