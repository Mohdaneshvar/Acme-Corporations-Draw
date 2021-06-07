using Framework.Application.Common.Extentions;
using NLog;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System.Collections;
using System.Globalization;
using System.Resources;

namespace Framework.Application
{
    public static class LogExcludeProperties
    {
    }
    public class LogDecoratorCommandHandler<T> : ICommandHandler<T> where T : IRestrictedCommand
    {
        private readonly ICommandHandler<T> _decorator;
        private readonly ICommandBus _commandBus;
        private readonly ICurrentUserService _currentUserService;
        public LogDecoratorCommandHandler(ICommandHandler<T> decorator, ICommandBus commandBus, ICurrentUserService currentUserService)
        {
            _decorator = decorator;
            _commandBus = commandBus;
            _currentUserService = currentUserService;
        }


        public async Task HandleAsync(T command, CancellationToken cancellationToken)
        {

            await _decorator.HandleAsync(command, cancellationToken);



        }


    }



}
