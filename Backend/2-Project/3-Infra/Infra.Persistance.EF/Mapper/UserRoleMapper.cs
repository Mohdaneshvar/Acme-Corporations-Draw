﻿using Domain.Accounts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infra.Persistance.EF.Mapper
{

    public class UserRoleMapper : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            

            //builder.HasOne(x=>x.User)
            //.WithMany(x=>x.UserRoles)
            //    .HasForeignKey(x => x.UserId);

            //builder.HasOne(x => x.Role)
            //    .WithMany(x => x.UserRoles)
            //    .HasForeignKey(x => x.RoleId);
        }
    }
}