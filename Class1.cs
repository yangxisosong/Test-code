using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Project1
{
    class Class1
    {
        private static void Main22(string[] args)
        {
            NewClassw nc = new NewClassw();
            Type t = nc.GetType();
            ConstructorInfo[] ci = t.GetConstructors();    //获取类的所有构造函数
            foreach (ConstructorInfo c in ci) //遍历每一个构造函数
            {
                ParameterInfo[] ps = c.GetParameters();    //取出每个构造函数的所有参数
                foreach (ParameterInfo pi in ps)   //遍历并打印所该构造函数的所有参数
                {
                    Console.Write(pi.ParameterType.ToString() + " " + pi.Name + ",");
                }
                //Console.WriteLine();
                Console.ReadLine();
            }
        }
    }

    class NewClassw
    {

        public NewClassw() //构造函数
        {
            Console.WriteLine("对象已创建");
        }
        ~NewClassw() //析构函数
        {
            Console.WriteLine("对象已删除");
        }

        public void test(string naem)
        {
            Console.WriteLine(naem);
        }

        public void age(int ag)
        {
            Console.WriteLine(ag);
        }
     }
}

