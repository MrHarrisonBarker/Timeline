using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Timeline.Contexts;
using Timeline.Helpers;
using Timeline.Services;
using Lib.Net.Http.WebPush;
using Timeline.Hubs;

namespace Timeline
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.AddLogging(loggingBuilder =>
            // {
            //     loggingBuilder.AddSeq(Configuration.GetSection("Seq"));
            // });
            
            services.AddDbContext<TimelineContext>(builder =>
            {
                builder.UseMySql(Configuration.GetConnectionString("dBContext"));
            });
            
            services.AddSignalR();

            // services.AddCors(options =>
            // {
            //     options.AddPolicy("CorsPolicy",
            //         builder =>
            //             builder.AllowAnyOrigin()
            //                 .AllowAnyMethod()
            //                 .WithExposedHeaders("content-disposition")
            //                 .AllowAnyHeader()
            //                 .AllowCredentials()
            //                 .SetPreflightMaxAge(TimeSpan.FromSeconds(3600)));
            // });
            
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => {
                        builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .WithMethods("GET","POST")
                            .DisallowCredentials().Build();
                    }
                );
            });

            services.AddCors();
            
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            // configure DI for application services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuditService, AuditService>();
            services.AddSingleton<IOnlineUsers, OnlineUsers>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
            
            services.AddResponseCompression();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            // app.UseCors("CorsPolicy");
            
            
            app.UseRouting();
            // app.UseCors(builder => builder
            //     .AllowAnyOrigin()
            //     .AllowAnyHeader()
            //     .AllowAnyMethod());
            //
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseResponseCompression();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<UserHub>("/hub/user");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}").RequireCors("CorsPolicy");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // spa.UseAngularCliServer(npmScript: "start");
                    // spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}