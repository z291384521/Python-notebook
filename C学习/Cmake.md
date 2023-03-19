**1.CMake编译原理**

CMake是一种跨平台编译工具，比make更为高级，使用起来要方便得多。CMake主要是编写CMakeLists.txt文件，然后用cmake命令将CMakeLists.txt文件转化为make所需要的makefile文件，最后用make命令编译源码生成可执行程序或共享库（so(shared object)）。因此CMake的编译基本就两个步骤：

```
1. cmake
2. make
```

cmake  指向CMakeLists.txt所在的目录，例如cmake .. 表示CMakeLists.txt在当前目录的上一级目录。cmake后会生成很多编译的中间文件以及makefile文件，所以一般建议新建一个新的目录，专门用来编译，例如

```
mkdir build
cd build
cmake ..
make
```

make根据生成makefile文件，编译程序。

简单Demo1

~~~cmake
#最低版本要求
cmake_minimum_required(VERSION 2.8)
#项目名称
project(Demo1)
#自订生成目标
add_executable(Demo main.cc)
~~~

