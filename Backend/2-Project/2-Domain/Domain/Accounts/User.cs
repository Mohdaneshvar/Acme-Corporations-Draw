using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Accounts
{
    public class User : IdentityUser<int>
    {
        
        public User()
        {
            UpdateDate = DateTime.Now;
            CreatedDate = DateTime.Now;
        }
        public User(string nationalCode)
        {
        }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public virtual ICollection<Role> Roles { get; set; }
    }
}
