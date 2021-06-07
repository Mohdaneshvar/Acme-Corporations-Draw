using FluentValidation;
using Framework.Application;
namespace AppService.Contracts.Queries.Accounts
{
    public class GetAllParticipantQueryValidator : AbstractValidator<GetAllParticipantQuery>, ICommandValidator<GetAllParticipantQuery>
    {
        public GetAllParticipantQueryValidator()
        {

        }
    }
}
