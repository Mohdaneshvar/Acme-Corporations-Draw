using App.Common;
using CleanArchitecture.Domain.Entities;
using Domain;
using Domain.Accounts;
using Domain.Enums;
using Domain.Participants;
using Framework.Application.Common.Extentions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infra.Persistance.EF.Extensions
{
    public static class DataSeeder
    {
        public static void SeedPermission(this ModelBuilder modelBuilder)
        {

        }
        public static async Task SeedAsync(this AppDbContext context, UserManager<User> userManager, AppSettings appSettings)
        {
            if (!context.AppConfigs.Any())
                await context.AppConfigs.AddAsync(new AppConfig { Key = AppConfigKey.CurrentDrawId, Value = "1" });
            if (!context.AllSerialNumbers.Any())
            {
                for (int i = 0; i < 100; i++)
                {
                    await context.AllSerialNumbers.AddAsync(new AllSerialNumber { SerialNumber = SKGLTools.CreateSerial(30, appSettings.SKGLSecretPhase) });
                }
            }
            if (!await userManager.Users.AnyAsync())
            {
                var adminUser = new User
                {
                    Id=1,
                    UserName = "Admin",
                    PhoneNumber = "09122222222",

                };
                var roleAdmin = new Role { Id = (int)RoleEnum.Admin, Name = nameof(RoleEnum.Admin) };
                if (!(await context.Roles.AnyAsync()))
                {
                    await context.Roles.AddAsync(roleAdmin);
                }
                adminUser.PasswordHash = userManager.PasswordHasher.HashPassword(adminUser, "admin");
                await context.Users.AddAsync(adminUser);
                //await context.SaveChangesAsync();
                await context.UserRoles.AddAsync(
                        new UserRole
                        {
                            RoleId = roleAdmin.Id,
                            UserId = adminUser.Id
                        });
                

            }
            await context.SaveChangesAsync();
        }
    }
}
