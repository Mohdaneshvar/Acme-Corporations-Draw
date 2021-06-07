using Domain.Enums;
using Framework.Application;
using System.Collections.Generic;

namespace AppService.Contracts.Commands.Participants
{
    [CommandRoute("RegistrerParticipantCommand")]
    public class RegisterParticipantCommand : IRestrictedCommand
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string ProductSerialNumber { get; set; }
        public bool HasOlderThan18 { get; set; }
        public List<RoleEnum> Roles => new List<RoleEnum> { RoleEnum.Admin,RoleEnum.Subject,RoleEnum.Anonymous };
    }
}
