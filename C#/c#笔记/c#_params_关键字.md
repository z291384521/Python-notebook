## params 

C#的关键字 params主要是在声明方法时参数类型或者个数不确定时使用

一.参数数组必须是一维数组　　
二.不允许将params修饰符与ref和out修饰符组合起来使用 　　
三.与参数数组对应的实参可以是同一类型的数组名，也可以是任意多个与该数组的元素属于同一类型的变量　　
四.若实参是数组则按引用传递，若实参是变量或表达式则按值传递　　
五.用法：可变的方法参数，也称数组型参数，适合于方法的参数个数不知的情况，用于传递大量的数组集合参数；当使用数组参数时，可通过使用params关键字在形参表中指定多种方法参数，并在方法的参数表中指定一个数组

### 形式为：

方法修饰符　返回类型　方法名（params　类型［］　变量名）

例子

~~~c#
namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            UseParams(1, 2, 3); //既可以用任意多个int
 
            int[] myarray = new int[3] { 10, 11, 12 };
            UseParams(myarray); //也可以是int一维数组  
 
            UseParams2(1, 'a', new object() );
        }
 
        public static void UseParams(params int[] list)
        {
            for (int i = 0; i < list.Length; i++)
            {
                Console.WriteLine(list[i]);
            }
            Console.WriteLine();
        }
 
        public static void UseParams2(params object[] list)
        {
            for (int i = 0; i < list.Length; i++)
            {
                Console.WriteLine(list[i]);
            }
            Console.WriteLine();
        }
    }
}
~~~

