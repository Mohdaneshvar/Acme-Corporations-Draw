using Framework.Application;
using System;

namespace AppService.Encryptor
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("enter your connection string");
                var enc = PasswordHelper.EncryptString(Console.ReadLine());
                Console.WriteLine(enc);
                Console.WriteLine(PasswordHelper.DecryptString(enc));
                Console.ReadKey();
            }
        }
    }
}
