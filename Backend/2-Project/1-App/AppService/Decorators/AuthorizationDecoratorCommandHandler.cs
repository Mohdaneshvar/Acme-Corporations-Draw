using Domain.Enums;
using Framework.Application;
using Framework.Application.Common.Extentions;
using Framework.Domain.Enum;
using Framework.Domain.Repository;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppService.Decorators
{
    public class AuthorizationDecoratorCommandHandler<T> : ICommandHandler<T> where T : IRestrictedCommand
    {
        private readonly ICommandHandler<T> _decoratee;

        private readonly ICurrentUserService _currentUser;
        private readonly IRepository<IdentityUserRole<string>> _userRoleRepository;

        public AuthorizationDecoratorCommandHandler(ICommandHandler<T> decoratee,
            ICurrentUserService currentUser, IRepository<IdentityUserRole<string>> userRoleRepository)
        {
            _decoratee = decoratee;
            this._currentUser = currentUser;
            this._userRoleRepository = userRoleRepository;
        }
        public async Task HandleAsync(T command, CancellationToken cancellationToken)
        {

            var roles = command?.Roles;
            if ((roles != null || roles.Count() > 0) && !roles.Contains(RoleEnum.Anonymous))
            {
                var hasAccess = _currentUser.Roles.Any(p => roles.Any(x => x == p));

                if (hasAccess)
                {
                    await _decoratee.HandleAsync(command, cancellationToken);
                }
                else
                    throw new ExceptionResult(StatusEnum.Forbidden);
            }
            else
                await _decoratee.HandleAsync(command, cancellationToken);
        }
    }
}