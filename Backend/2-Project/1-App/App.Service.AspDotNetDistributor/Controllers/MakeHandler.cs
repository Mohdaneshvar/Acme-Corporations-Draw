using System;
using System.Threading.Tasks;
using Framework.Application;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using SimpleInjector.Lifestyles;
using Framework.Application.Common.Extentions;
using NLog;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using System.Reflection;
using System.Text;
namespace App.Service.AspDotNetDistributor.Controllers
{
    public class MakeHandler
    {
        private readonly ICommandBus _commandBus;
        private readonly ICurrentUserService _currentUserServer;
        private readonly IServiceProvider _serviceProvider;
        private static ILogger _logger = LogManager.GetCurrentClassLogger();
        public MakeHandler(ICurrentUserService currentUserServer)
        {
            this._serviceProvider = Startup._container;
            this._commandBus = _serviceProvider.GetService<ICommandBus>();

            this._currentUserServer = currentUserServer;
        }
        public async Task<IActionResult> MakeHandlerAsync<T>(T command) where T : IRestrictedCommand
        {
            object result = null;
            using (AsyncScopedLifestyle.BeginScope(Startup._container))
                await _commandBus.DispatchAsync(command);

            if (command.HaveResult())
            {
                var commandResult = command.GetResult();
                result = commandResult;
                var json = JsonConvert.SerializeObject(commandResult, Formatting.None, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                if (string.IsNullOrEmpty(json))
                {
                    result = null;
                }
            }
            else
                result = null;
            if (result == null)
                return new OkResult();
            else 
            {
                if (CheckTypeResult(result.GetType()))
                {
                    return (IActionResult)result;
                }
                return new OkObjectResult(result);
            }
           
        }
        private bool CheckTypeResult(Type result)
        {
            if (result == typeof(ActionResult))
                return true;
            if (result?.BaseType==null)
            {
                return false;
            }
            return CheckTypeResult(result.BaseType);
        }
    }
}
