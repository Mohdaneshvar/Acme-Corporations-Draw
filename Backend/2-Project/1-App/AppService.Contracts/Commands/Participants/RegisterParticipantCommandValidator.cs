using App.Common;
using AppService.Contracts.Commands.Participants;
using Domain;
using Domain.Participants;
using FluentValidation;
using FluentValidation.Results;
using Framework.Application;
using Framework.Domain.Repository;
using Framework.Domain.Resource;

namespace AppService.Contracts.Commands.Accounts
{
    public class RegisterParticipantCommandValidator : AbstractValidator<RegisterParticipantCommand>, ICommandValidator<RegisterParticipantCommand>
    {
        private readonly IRepository<Participant> participantRepository;
        private readonly AppSettings appSettings;
        private readonly IRepository<AllSerialNumber> allSerialNumberRepository;

        public RegisterParticipantCommandValidator(IRepository<Participant> participantRepository, AppSettings appSettings, IRepository<AllSerialNumber> allSerialNumberRepository)
        {
            this.participantRepository = participantRepository;
            this.appSettings = appSettings;
            this.allSerialNumberRepository = allSerialNumberRepository;
        }
        public ValidationResult Validate(RegisterParticipantCommand command)
        {
            var result = new ValidationResult();
            if (!command.HasOlderThan18)
                result.Errors.Add(new ValidationFailure(nameof(command.ProductSerialNumber),Status.ShouldBeOlderThan18));
            else
            {
                var serialHasValidFormat = SKGLTools.ValidateSerial(command.ProductSerialNumber, appSettings.SKGLSecretPhase);
                if (!serialHasValidFormat)
                    result.Errors.Add(new ValidationFailure(nameof(command.ProductSerialNumber), Status.SerialNumberIsInvalid));
                else
                {
                  
                }
            }

            return result;
        }
    }
}
