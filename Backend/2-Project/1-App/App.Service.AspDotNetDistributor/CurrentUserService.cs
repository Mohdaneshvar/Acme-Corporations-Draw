using Framework.Application;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Security.Claims;
using System.Collections.Generic;
using Domain.Enums;

namespace App.Service.AspDotNetDistributor
{
    public class CurrentUserService : ICurrentUserService
    {

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            IEnumerable<Claim> claims = httpContextAccessor.HttpContext?.User?.Claims;
            if (claims == null)
            {
                return;
            }
            foreach (Claim claim in claims)
            {
                switch (claim.Type)
                {
                    case ClaimTypes.NameIdentifier:
                        UserId = int.Parse(claim.Value);
                        httpContextAccessor.HttpContext.Items.TryAdd("userId", UserId);
                        break;
                    case ClaimTypes.Name:
                        Name = claim.Value;
                        break;
                    case ClaimTypes.Role:
                        Roles = claim.Value?.Split(',')?.Select(x => (RoleEnum)Convert.ToInt32(x));
                        break;
                    
                }
            }
        }
        public int? UserId { get; set; }
        public IEnumerable<RoleEnum> Roles { get; set; }
        public string Name { get; set; }
    }
}
