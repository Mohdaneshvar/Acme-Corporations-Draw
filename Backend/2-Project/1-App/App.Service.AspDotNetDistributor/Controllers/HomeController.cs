using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace App.Service.AspDotNetDistributor.Controllers
{
    public class HomeController : Controller
    {
        // GET: HomeController
        public string Index()
        {
            return "Application is up";
        }
    }
}
