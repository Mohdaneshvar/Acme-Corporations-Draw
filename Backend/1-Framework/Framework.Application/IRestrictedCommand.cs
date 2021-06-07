using Domain.Enums;
using Framework.Domain.Enum;
using System.Collections.Generic;

namespace Framework.Application
{
    public interface IRestrictedCommand
    {
        List<RoleEnum>  Roles { get; }
    }
}