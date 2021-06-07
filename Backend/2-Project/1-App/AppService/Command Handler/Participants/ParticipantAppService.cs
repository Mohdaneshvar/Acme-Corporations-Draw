using AppService.Contracts.Commands.Accounts;
using AppService.Contracts.Commands.Participants;
using CleanArchitecture.Domain.Entities;
using Domain.Accounts;
using Domain.Enums;
using Domain.Participants;
using Framework.Application;
using Framework.Domain.Enum;
using Framework.Domain.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppService.Command_Handler.Accounts
{
    public class ParticipantAppService : ICommandHandler<RegisterParticipantCommand>
    {
        private readonly IRepository<Participant> participantRepository;
        private readonly IRepository<AppConfig> appConfigRepository;
        private readonly IRepository<AllSerialNumber> allSerialNumberRepository;

        public ParticipantAppService(IRepository<Participant> participantRepository, IRepository<AppConfig> appConfigRepository, IRepository<AllSerialNumber> allSerialNumberRepository)
        {
            this.participantRepository = participantRepository;
            this.appConfigRepository = appConfigRepository;
            this.allSerialNumberRepository = allSerialNumberRepository;
        }

        public async Task HandleAsync(RegisterParticipantCommand command, CancellationToken cancellationToken)
        {
            var currentDraw = (await appConfigRepository.FindAsync(AppConfigKey.CurrentDrawId));

            var serialIsExisted = allSerialNumberRepository.Query().Where(x => x.SerialNumber == command.ProductSerialNumber).Any();
            if (!serialIsExisted)
                throw new ExceptionResult(StatusEnum.SerialNumberNotExists);

            var productSerialNumberCount = participantRepository.Query().Where(x => x.ProductSerialNumber == command.ProductSerialNumber).Count();
            if (productSerialNumberCount > 1)
                throw new ExceptionResult(StatusEnum.SerialHasBeenRegisteredMoreThanTwo);

            var entity = new Participant
            {
                FirstName = command.FirstName,
                EmailAddress = command.EmailAddress,
                LastName = command.LastName,
                ProductSerialNumber = command.ProductSerialNumber,
                DrawResultState = DrawResultState.OnPerforming,
                DrawId = Convert.ToInt32(currentDraw.Value),
                RegisterDate = DateTime.Now
            };

            await participantRepository.AddAsync(entity);
        }
    }
}
