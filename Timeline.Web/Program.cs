using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace Timeline
{
    public class Program
    {
        private readonly byte[] address = {192,168,1,124};
        
        public static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.Development.json")
                .AddCommandLine(args)
                .Build();

            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.Seq("http://localhost:5341", apiKey: "7jZh8Zf5719xDvOEuWHC")
                .CreateLogger();

            try
            {
                Log.Information("Starting up");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Application start-up failed");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            

            Host.CreateDefaultBuilder(args)
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder => 
                {
                    webBuilder.UseUrls("http://192.168.1.124:5000");
                    webBuilder.UseStartup<Startup>();
                    webBuilder.ConfigureKestrel((context, serverOptions) =>
                    {
                        // serverOptions.Listen(IPAddress.Loopback, 5000);
                    });
                });
    }
}