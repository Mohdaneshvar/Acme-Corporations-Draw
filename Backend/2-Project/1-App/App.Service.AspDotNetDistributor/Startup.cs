using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleInjector;
using Infra.Persistance.EF;
using Framework.Application;
using Framework.Data;
using Microsoft.EntityFrameworkCore;
using Framework.Application.Config;
using AppService.Config;
using Microsoft.AspNetCore.Http;
using App.Service.AspDotNetDistributor.Filters;
using SimpleInjector.Lifestyles;
using System.Web.Mvc;
using SimpleInjector.Integration.Web.Mvc;
using Framework.Domain.Events;
using App.Service.Distributor.Common;
using Newtonsoft.Json;
using System.IO;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Domain.Accounts;
using Microsoft.AspNetCore.Identity;
using App.Service.AspDotNetDistributor.JwtFeatures;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Framework.Domain.Repository;
using Framework.Data.EF;
using App.Service.AspDotNetDistributor.Controllers;
using Microsoft.Extensions.Logging;
using BotDetect.Web;
using AppService.Command_Handler.Accounts;
using AppService.Contracts.Commands.Accounts;
using Domain;
using AppService.Contracts.Commands.Participants;

namespace App.Service.AspDotNetDistributor
{
    public class Startup
    {
        public static Container _container;
        private AppSettings _appSettings;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            _appSettings = _configuration.Get<AppSettings>();
            _container = new SimpleInjector.Container();

            _container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(_container));
            _container.Options.ResolveUnregisteredConcreteTypes = false;
        }

        private IConfiguration _configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;
            InitializeContainer();
            services.AddHttpClient();
            services.AddSingleton<AppSettings>(x => _configuration.Get<AppSettings>());
            services.Configure<AppSettings>(_configuration);
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddTransient<MakeHandler>();
            services.AddSingleton<ILoggerFactory, LoggerFactory>();
            services.AddSingleton(typeof(ILogger<>), typeof(Logger<>));

            services.AddScoped<JwtHandler>();
            services.AddControllersWithViews().AddMvcOptions(options =>
           {
               options.Filters.Add(typeof(EncodeInputsActionFilter));
           });
            services.AddInfrastructure(_configuration, true);
            services.AddSimpleInjector(_container
         , options =>
            {
                options.AddAspNetCore()
         ;
            }
         );
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 1;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            });
            services.
                AddMvc(o =>
                {
                    o.Conventions.Add(new GenericControllerRouteConvention());
                    o.EnableEndpointRouting = true;
                }
                    ).ConfigureApplicationPartManager(m => m.FeatureProviders.Add(new RemoteControllerFeatureProvider(_container)));
                //.AddNewtonsoftJson(o =>
                //{
                //    o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                //});
            services.AddInfrastructure(_configuration, true);

            services.AddScoped<IDbContext, AppDbContext>(x => new AppDbContext(new DbContextOptionsBuilder<AppDbContext>().UseSqlServer(_appSettings.ConnectionStrings.ConnectingString).Options));

            services.AddIdentity<User, IdentityRole<int>>(opt =>
            {
                opt.Password.RequiredLength = 7;
                opt.Password.RequireDigit = false;

                opt.User.RequireUniqueEmail = false;

                opt.Lockout.AllowedForNewUsers = true;
                opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(2);
                opt.Lockout.MaxFailedAccessAttempts = 3;
                opt.SignIn.RequireConfirmedEmail = false;
                opt.SignIn.RequireConfirmedAccount = false;
                opt.SignIn.RequireConfirmedPhoneNumber = false;
            })
               .AddEntityFrameworkStores<AppDbContext>()

             .AddDefaultTokenProviders();

            services.Configure<DataProtectionTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromHours(2));

            var jwtSettings = _appSettings.JWTSettings;
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = jwtSettings.validIssuer,
                    ValidAudience = jwtSettings.validAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.securityKey))
                };
            });
            services.AddScoped<IRepository<User>, EFRepository<User>>();
            services.AddScoped<IRepository<UserRole>, EFRepository<UserRole>>();
            services.AddScoped<JwtHandler>();


            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(_appSettings.ConnectionStrings.ConnectingString));
            services.AddScoped<IEventDispatcher, EventDispatcher>();
            services.AddScoped<IEventHandlerFactory, EventHandlerFactory>();
            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

            services.AddSingleton<ICacheProvider, RedisCacheProvider>();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });
        }

        private void InitializeContainer()
        {
            FrameworkConfigurator.WireUp(_container, false, typeof(ParticipantAppService).Assembly, typeof(RegisterParticipantCommand).Assembly);
            AppServiceConfigurator.WireUp(_container);
            _container.Register<ICurrentUserService, CurrentUserService>();

            _container.Register<IHttpContextAccessor, HttpContextAccessor>();

            var reg = Lifestyle.Scoped.CreateRegistration(() =>
            {
                return new AppDbContext(new DbContextOptionsBuilder<AppDbContext>().UseSqlServer(_appSettings.ConnectionStrings.ConnectingString).Options);
            }, _container);

            _container.AddRegistration<IDbContext>(reg);
        
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSimpleInjector(_container);

            // configure your application pipeline to use SimpleCaptcha middleware
            app.UseSimpleCaptcha(_configuration.GetSection("BotDetect"));


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseCustomExceptionHandler();
            //app.UseSimpleInjector(_serviceProvider);

            _container.Verify();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapDefaultControllerRoute());

            

            

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }
        }
    }


}
