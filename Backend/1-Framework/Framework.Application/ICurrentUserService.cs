using Domain.Enums;
using System.Collections.Generic;

namespace Framework.Application
{
    public interface ICurrentUserService
    {
        int? UserId { get; set; }
        string Name { get; set; }
        public IEnumerable<RoleEnum> Roles { get; set; }
    }
}
