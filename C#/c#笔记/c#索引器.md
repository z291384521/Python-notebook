## C# 索引器

所以就是给 类[]调用的写法



~~~c#
//总结
//索引器对于我们来说的主要作用
//可以让我们以中括号的形式范围自定义类中的元素规则自己定访问时和数组一样
//比较适用于在类中有数组变量时使用可以方便的访问和进行逻辑处理

//固定写法
//访问修饰符返回值this[参数列表]

//get和set语句块
//可以重载

//注意:结构体里面也是支持索引器

~~~



~~~c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace cshap索引器
{
    class PersonList{
        private string[] namelist = new string[size];
        static public int size = 10;
        public PersonList()
        {
            for (int i = 0; i < size; i++)
                namelist[i] = "N. A.";
        }
        //索引器写法如下
        public string this[int index]
        {
            get
            {
                string tmp;

                if (index >= 0 && index <= size - 1)
                {
                    tmp = namelist[index];
                }
                else
                {
                    tmp = "";
                }

                return (tmp);
            }
            set
            {
                if (index >= 0 && index <= size - 1)
                {
                    namelist[index] = value;
                }
            }
        }
        //索引器的重载
        public int this[string name]
        {
            get
            {
                int index = 0;
                while (index < size)
                {
                    if (namelist[index] == name)
                    {
                        return index;
                    }
                    index++;
                }
                return index;
            }

        }

    }

    internal class Program
    {
        static void Main(string[] args)
        {
            PersonList list1 = new PersonList();
            list1[0] = "Zara";
            list1[1] = "Riz";
            list1[2] = "Nuha";
            list1[3] = "Asif";
            list1[4] = "Davinder";
            list1[5] = "Sunil";
            list1[6] = "Rubic";

            for (int i = 0; i < PersonList.size; i++)
            {
                Console.WriteLine(list1[i]);
            }
            //重载的索引器
            Console.WriteLine(list1["Nuha"]);
            Console.ReadKey();
        }
    }
    }
}

~~~

