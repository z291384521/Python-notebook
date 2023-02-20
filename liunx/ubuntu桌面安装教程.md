# VMware虚拟机安装Ubuntu20.04详细图文教程

### [VMware](https://so.csdn.net/so/search?q=VMware&spm=1001.2101.3001.7020)虚拟机安装Ubuntu20.04详细图文教程

- 1 VM和Ubuntu下载
- 2 VM安装Ubuntu
- 3 更改Ubuntu软件源
- 4 Windows与Ubuntu跨系统复制粘贴

# 1 VM和[Ubuntu](https://so.csdn.net/so/search?q=Ubuntu&spm=1001.2101.3001.7020)下载

**Ubuntu系统下载官方链接：**[Ubuntu系统下载](https://ubuntu.com/download/desktop)

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044384.png)

**VMware下载官方链接:** [VMware Workstation 16 Player下载 ](https://www.vmware.com/cn/products/workstation-player/workstation-player-evaluation.html)

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044432.png)

**下完VMware直接安装就行了**

# 2 VM安装Ubuntu

**双击打开VMware Workstation 16 Player**
![双击打开](img/ubuntu安装教程/d49d73980c79436baea7d2c45f698f41-20230202230044356.png)**点击创建新虚拟机**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044374.png)**选择稍后安装操作系统，再点下一步**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_15,color_FFFFFF,t_70,g_se,x_16-20230202230044362.png)**然后注意这两个地方，选择操作系统和版本如下，再点下一步**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_15,color_FFFFFF,t_70,g_se,x_16-20230202230044365.png)**自己定一个系统存储位置，再下一步**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_15,color_FFFFFF,t_70,g_se,x_16-20230202230044373.png)**最大磁盘大小按需修改，选择存储为单个文件，再下一步**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_15,color_FFFFFF,t_70,g_se,x_16-20230202230044391.png)**点击自定义硬件**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_15,color_FFFFFF,t_70,g_se,x_16-20230202230044392.png)**选择使用ISO映像文件，浏览选中刚开始下载的Ubuntu系统，然后点右下角的关闭，再点完成**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044398.png)**选中，点击播放虚拟机**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044407.png)**然后等待…**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044404.png)**进入之后，下拉选中 中文简体，再点Ubuntu安装**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044433.png)**再双击chinese。这里因为Ubuntu系统显示器大小不对，下面的界面显示不出来，我们在下一步先来修改它的显示器大小**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044436.png)**到这里后，本来右下箭头所指地方有 继续 按钮，但是显示不出来，我们先关掉安装界面，退出安装**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044430.png)![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_19,color_FFFFFF,t_70,g_se,x_16-20230202230044434.png)**等待…然后进入如下页面，点击右上角倒三角形，再点击设置**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044491.png)**下拉找到显示器，点击分辨率**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044462.png)**任意改为另一个，例如1024x768，再点击应用**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044466.png)**选择保留更改**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044469-5350044.png)**然后点击左上角图标，重新进入系统安装**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044469.png)**可以看到这时能显示继续的按钮，点击继续**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044512.png)

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044516.png)

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044501.png)**点击现在安装**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044512-5350044.png)**再点击继续**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044529.png)**选择地区**
点中国所在范围![在这里插入图片描述](img/ubuntu安装教程/385af46dc7584c989052481f68999394-20230202230044526.png)

**自行填写以下信息**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044506.png)**然后便进入安装等待界面**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044569.png)**下载文件时间较长，可点击展开选择skip，然后再等待一段时间…**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044557.png)**安装完成，提示重启，点击重启**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_19,color_FFFFFF,t_70,g_se,x_16-20230202230044544.png)**然后根据提示，进入系统，显示如下界面，即安装完成。**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044541.png)

# 3 更改Ubuntu软件源

**配置系统的软件源，提高下载速度**
**先点左下角矩形网格，找到并打开 软件与更新**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044760.png)**按图示修改**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044561.png)![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044570.png)**点击选择一个服务器，如第一个，再点选择服务器**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_16,color_FFFFFF,t_70,g_se,x_16-20230202230044577.png)**再点关闭**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044575.png)**点击重新载入，并等待**

![在这里插入图片描述](img/ubuntu安装教程/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5aW95YOP5b6I5aW95ZCD,size_20,color_FFFFFF,t_70,g_se,x_16-20230202230044582.png)**其中需输入密码，即之前自行设置的密码，此后有软件更新点击更新即可**
**到这里软件源更改完成。**

# 4 Windows与Ubuntu跨系统复制粘贴

**打开终端，手动输入以下命令，再重启ubuntu系统就可以了**
**即通过安装VMtools实现了Windows与Ubuntu跨系统复制粘贴，也实现了Ubuntu窗口自适应**

```
sudo apt-get autoremove open-vm-tools
sudo apt-get install open-vm-tools
sudo apt-get install open-vm-tools-desktop
123
```

参考：[Copy/paste and drag&drop not working](https://askubuntu.com/questions/691585/copy-paste-and-dragdrop-not-working-in-vmware-machine-with-ubuntu/824341#824341)