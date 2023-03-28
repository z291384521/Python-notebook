### transform.forward
transform.forward	在世界坐标奏中表示物体正前方 但是其magnitude长度是1
transform.right		在世界坐标系中表示物体正右方 但是其magnitude长度是1。
transform.up		在世界坐标系中表示物体正上方 但是其magnitude长度是1。


###  而vector3.forward只表示（0，0，1）
物体进行改变位置代码如下
transform.position+=Vector3.forward; 
![在这里插入图片描述](https://img-blog.csdnimg.cn/a50854fa3fbd495bacd96cbecde2ba79.png)
### transform.translate
transform.translate第二个参数分**自身**与**世界**之分默认自身
已世界坐标 已自身坐标移动
transform.translate(vector3.forward，space.self) 
沿自己的Z轴移动
transform.translate(vector3.forward，space.wrold)  
沿世界的Z移动


当物体没发生旋转的时候
  Transform.forward = Vector3.forward
  都是向世界坐标的z轴前进
当物体发生旋转后
      Transform.forward != Vector3.forward
      这是Transform.forward是朝着物体当前的前方移动
      Vector3.forward则还是朝着世界坐标的z轴移动