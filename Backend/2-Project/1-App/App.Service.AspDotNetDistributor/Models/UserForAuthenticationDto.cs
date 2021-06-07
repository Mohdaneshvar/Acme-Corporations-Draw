using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace App.Service.AspDotNetDistributor.Models
{
    public class UserForAuthenticationDto
    {
        [Required]
        [Display(Name = "UserName")]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string UserEnteredCaptchaCode { get; set; }
        public string CaptchaId { get; set; }
    }
}
