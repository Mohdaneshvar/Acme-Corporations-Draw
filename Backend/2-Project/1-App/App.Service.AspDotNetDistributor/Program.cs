using System;
using System.IO;
using System.Threading.Tasks;
using AppService.Contracts;
using Domain;
using Domain.Accounts;
using Framework.Data;
using Infra.Persistance.EF;
using Infra.Persistance.EF.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Web;

namespace App.Service.AspDotNetDistributor
{
    public class Program
    {
        private static AppSettings _appSettings;
        public static async Task Main(string[] args)
        {
            IConfigurationRoot config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true)
            .AddCommandLine(args)
            .Build();
            Console.WriteLine("step2");
            _appSettings = config.Get<AppSettings>();
            GlobalDiagnosticsContext.Set("connectionString", _appSettings.ConnectionStrings.ConnectingString);
            Logger logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
            Console.WriteLine("step3");
            try
            {
                var host = CreateWebHostBuilder(args).Build();
                Console.WriteLine("step4");
                
                await InitializeDatabaseAsync(host);
                Console.WriteLine("step5");
                CreateConfigLog(host);
                Console.WriteLine("step6");
                host.Run();
                Console.WriteLine("step7");
            }
            catch (Exception ex)
            {
                Console.WriteLine(  ex);
                logger.Fatal(ex,GetStackTraceWithMessage(ex));
                throw new Exception(ex.Message);
            }
            finally
            {
                LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateWebHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder
                    .ConfigureKestrel(c=>c.AllowSynchronousIO=true)
                    .UseStartup<Startup>();
                    
                }).ConfigureLogging(logging =>
                {
                    // logging.ClearProviders();
                    logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
                }).UseNLog();

        private static void CreateConfigLog(IHost host)
        {
            using (IServiceScope scope = host.Services.CreateScope())
            {
                IServiceProvider services = scope.ServiceProvider;

                IWebHostEnvironment hostingEnvironment = services.GetRequiredService<IWebHostEnvironment>();
                string webRoot = hostingEnvironment.WebRootPath;
                string path = "/ConfigLog.json";

                try
                {
                    if (File.Exists(webRoot + path))
                    {
                        File.Delete(webRoot + path);
                    }
                }
                catch (Exception)
                {
                }
            }
        }

        public async static Task InitializeDatabaseAsync(IHost host)
        {
            using (IServiceScope scope = host.Services.CreateScope())
            {
                IServiceProvider services = scope.ServiceProvider;

                var dbContext = services.GetService<IDbContext>();
                var userManager = services.GetService<UserManager<User>>();
                var appSetting = services.GetService<AppSettings>();
                ((AppDbContext)dbContext).Database.Migrate();
                await ((AppDbContext)dbContext).SeedAsync(userManager, appSetting);
            }
        }

        public static string GetStackTraceWithMessage( System.Exception ex)
        {
            if (string.IsNullOrEmpty(ex?.Message?.Trim())) return ex?.StackTrace;

            string result = ex.Message + "\r\n";
            result += ex.StackTrace;

            if (null != ex.InnerException)
            {
                string innerResult = GetStackTraceWithMessage(ex.InnerException);
                result += "\r\ninner : " + innerResult;
            }

            return result;
        }
    }
}
