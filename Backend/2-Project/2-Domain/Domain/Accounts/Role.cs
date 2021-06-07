using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Accounts
{

    public class Role : IdentityRole<int>
    {
        //public ICollection<UserRole> UserRoles { get; set; }
    }
}
