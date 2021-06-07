using System.Threading.Tasks;
using Framework.Application;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace App.Service.AspDotNetDistributor.Controllers
{
    [GeneratedController("api")]
    public class BaseControllerFromForm<T> : Controller where T : IRestrictedCommand
    {
        private  MakeHandler _makeHandler;
        public BaseControllerFromForm( MakeHandler makeHandler)
        {
            _makeHandler = makeHandler;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync(T command)
        {
            return await _makeHandler.MakeHandlerAsync(command);
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> PostAsync([FromForm] T command)
        {
            return await _makeHandler.MakeHandlerAsync(command);
        }
    }
}
