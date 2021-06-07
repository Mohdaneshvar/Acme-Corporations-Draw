using Domain.Enums;
using Framework.Application;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AppService.Contracts.Commands.Accounts
{
    [CommandRoute("CreateSerialNumberCommand")]
    public class CreateSerialNumberCommand : IRestrictedCommand,IHaveResult<FileContentResult>
    {
        public int Count { get; set; }
        public List<RoleEnum> Roles => new List<RoleEnum> { RoleEnum.Admin};

        public FileContentResult Result { get; set; }
    }
}
