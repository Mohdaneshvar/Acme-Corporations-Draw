using AppService.Contracts.Queries.Accounts;
using Domain.Accounts;
using Framework.Application;
using Framework.Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Framework.Data.EF.Extensions;
using Framework.Domain.Enum;
using System;
using Domain.Participants;
using AppService.Contracts.Dtos.Participants;
using Domain.Enums;

namespace AppService.Query_Handler.Accounts
{
    public class ParticipantQueryHandlers :ICommandHandler<GetAllParticipantQuery>
    {
        private readonly ICurrentUserService currentUser;
        private readonly IRepository<Participant> participantRepository;

        public ParticipantQueryHandlers(IRepository<Participant> participantRepository)
        {
            this.participantRepository = participantRepository;
        }
        public  async Task HandleAsync(GetAllParticipantQuery command, CancellationToken cancellationToken)
        {
            var query = participantRepository.Query().Select(x => new ParticipantDto
            {
                DrawId = x.DrawId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                EmailAddress = x.EmailAddress,
                ParticipantId = x.ParticipantId,
                ProductSerialNumber = x.ProductSerialNumber,
                RegisterDate = x.RegisterDate,
                DrawResultState = x.DrawResultState
            });
            //Enum.GetName(typeof(DrawResultState),
           command.Result =  await query.OrderByDescending(x => x.RegisterDate).GetPagedAsync(command.Skip, command.PageSize);
            




        }
       
    }
}
