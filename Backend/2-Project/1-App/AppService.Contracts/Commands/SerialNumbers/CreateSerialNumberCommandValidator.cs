using App.Common;
using Domain;
using Domain.Participants;
using FluentValidation;
using FluentValidation.Results;
using Framework.Application;
using Framework.Domain.Repository;
using System.Linq;

namespace AppService.Contracts.Commands.Accounts
{
    public class CreateSerialNumberCommandValidator : AbstractValidator<CreateSerialNumberCommand>, ICommandValidator<CreateSerialNumberCommand>
    {
        public CreateSerialNumberCommandValidator()
        {
        }
     
    }
}
