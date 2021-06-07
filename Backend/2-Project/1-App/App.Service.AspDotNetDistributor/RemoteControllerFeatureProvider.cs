using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using App.Service.AspDotNetDistributor.Controllers;
using Framework.Application;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.CodeAnalysis;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using AppService.Contracts;
using AppService.Command_Handler.Accounts;

namespace App.Service.AspDotNetDistributor
{
    public class RemoteControllerFeatureProvider : IApplicationFeatureProvider<ControllerFeature>
    {
        private readonly IServiceProvider _serviceProvider;

        public RemoteControllerFeatureProvider(IServiceProvider serviceProvider)
        {
            this._serviceProvider = serviceProvider;
        }
        public void PopulateFeature(IEnumerable<ApplicationPart> parts, ControllerFeature feature)
        {
            var commandHandlers = ((Container)_serviceProvider).GetTypesToRegister(typeof(ICommandHandler<>), new[] {
                typeof(ParticipantAppService).Assembly

        });
            var commands = commandHandlers.SelectMany(type => type.GetInterfaces())
                            .Where(type => type.IsGenericType)
                            .Select(type => type.GetGenericArguments().First());
            foreach (var command in commands)
            {
                using (AsyncScopedLifestyle.BeginScope(Startup._container))
                {
                    System.Reflection.TypeInfo controller;
                    if (command.GetCustomAttribute<CommandFromFormAttribute>() != null)
                        controller = typeof(BaseControllerFromForm<>).MakeGenericType(command).GetTypeInfo();
                    else
                        controller = typeof(BaseControllerFromBody<>).MakeGenericType(command).GetTypeInfo();
                    feature.Controllers.Add(controller);
                }
            }
        }
    }
}
