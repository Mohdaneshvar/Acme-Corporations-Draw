using AppService.Contracts.Dtos.Participants;
using Domain.Accounts;
using Domain.Enums;
using Domain.Participants;
using Framework.Application;
using Framework.Data.EF.Extensions;
using System.Collections.Generic;
namespace AppService.Contracts.Queries.Accounts
{

    [CommandRoute("GetAllParticipantQuery")]
    public class GetAllParticipantQuery : PagedRequest<Participant>, IHaveResult<PagedResult<ParticipantDto>>, IRestrictedCommand
    {
        public PagedResult<ParticipantDto> Result { get; set; }
        public List<RoleEnum> Roles => new List<RoleEnum> { RoleEnum.Admin };

    }
}
