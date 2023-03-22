using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace 迭代器
{
    //一个类想要被遍历
    class CustomList : IEnumerable, IEnumerator
    {

        private int[] list;
        //起始位置是-1
        private int position = -1;
        public CustomList()
        {
            list = new int[] { 1, 2, 3, 4, 5, 6, 7, 8 };
        }

        public object Current
        {
            get { return list[position]; }

        }

        #region IEnumerable实现的返回
        //返回一个IEnumerator
        public IEnumerator GetEnumerator()
        {
            Reset();
            return this;
        }
        #endregion 

        public bool MoveNext()
        {
            position++;
            //判断position合不合法
            return position < list.Length;
        }

        public void Reset()
        {
            //第一次进行复原
            //要不然第二次就不会成功调用
            position= -1;
        }
    }

    //yield return是c#提供给我们的语法糖
    //所谓语法糖，也称糖衣语法
    //主要作用就是将复杂逻辑简单化.可以增加程序的可读性
    //从而减少程序代码出错的机会

    class CustomList2 : IEnumerable
    {
        private int[] list;
        public CustomList2()
        {
            list = new int[] { 1, 2, 3, 4, 5, 6, 7, 8 };
        }

        public IEnumerator GetEnumerator()
        {
            for (int i = 0; i < list.Length; i++)
            {
                ////yield关键字配合迭代器使用
                //可以理解为暂时返回保留当前的状态
                yield return list[i];
            }
        }
    }
    class CustomList<T> : IEnumerable
    {
        private T[] list;
        public CustomList(params T[] array)
        {
            this.list = array;
        }

        public IEnumerator GetEnumerator()
        {
            for (int i = 0; i < list.Length; i++)
            {
                ////yield关键字配合迭代器使用
                //可以理解为暂时返回保留当前的状态
                yield return list[i];
            }
        }
    }


    internal class Program
    {
        static void Main(string[] args)
        {
            CustomList list = new CustomList();
            // foreach本质
            //1.先获取in后面这个对象的IEnumerator
            // 会调用对象其中的GetEnumerator方法来获取.
            // 执行得到这个IEnumerator对象中的MoveNext方法只要MoveNext方法的
            // 返回值时true就会去得到current
            //然后复制给item

            foreach (int i in list)
            {
                Console.WriteLine(i);
            }

            CustomList<string> list2 = new CustomList<string>("123", "321", "333", "555");
            foreach (string i in list2)
            {
                Console.WriteLine(i);
            }
            Console.ReadLine();
        }

    }
}
