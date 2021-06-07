using System.Threading.Tasks;
using App.Service.AspDotNetDistributor.JwtFeatures;
using App.Service.AspDotNetDistributor.Models;
using BotDetect.Web;
using Domain.Accounts;
using Entities.DTO;
using Framework.Application;
using Framework.Domain.Enum;
using Framework.Domain.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyEmployees.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly IRepository<User> _userRepository;

        public AccountController(UserManager<User> userManager, JwtHandler jwtHandler,   IRepository<User> userRepository)
        {
            _userManager = userManager;
            _jwtHandler = jwtHandler;
            _userRepository = userRepository;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            if (!CaptchaValidate(userForAuthentication.UserEnteredCaptchaCode, userForAuthentication.CaptchaId))
                return BadRequest("captcha is not correct");

            var user = await _userRepository.Where(x => x.UserName == userForAuthentication.UserName).FirstOrDefaultAsync();

            var passIsValid =await _userManager.CheckPasswordAsync(user,userForAuthentication.Password);
            if (user == null || !passIsValid)
                throw new ExceptionResult(StatusEnum.UserNotFound);
            var token = await _jwtHandler.GenerateToken(user);
            return Ok(new AuthResponseDto {IsAuthSuccessful=true,Token=token });
        }
        private bool CaptchaValidate(string userEnteredCaptchaCode, string captchaId)
        {
            // create a captcha instance to be used for the captcha validation
            SimpleCaptcha captcha = new SimpleCaptcha();
            // execute the captcha validation
            bool isHuman = captcha.Validate(userEnteredCaptchaCode, captchaId);
            // return the json string with the validation result to the frontend
            return isHuman;
        }
    }
}
