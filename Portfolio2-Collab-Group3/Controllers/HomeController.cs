using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using Firebase.Database;
using Firebase.Database.Query;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Portfolio2_Collab_Group3.Models;

namespace Portfolio2_Collab_Group3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> About()
        {
            //Simulate test user data and login timestamp
            var userID = "12345";
            var currentLoginTime = DateTime.UtcNow.ToString("MM/dd/yyyy HH:mm:ss");

            //Save non identifying data to Firebase
            var currentUserLogin = new UserData() { TimestampUtc = currentLoginTime };
            var firebaseClient = new FirebaseClient("https://portfolio-2-6e9fc.firebaseio.com/");
            var result = await firebaseClient.Child("Users/" + userID + "/Logins").PostAsync(currentUserLogin);

            //Retrieve data from Firebase
            var dbLogins = await firebaseClient.Child("Users").Child(userID)
                .Child("Logins").OnceAsync<UserData>();

            var timestampList = new List<DateTime>();

            //Convert JSON data to original datatype
            foreach (var login in dbLogins)
            {
                timestampList.Add(Convert.ToDateTime(login.Object.TimestampUtc).ToLocalTime());
            }
            ViewBag.CurrentUser = userID;
            ViewBag.Logins = timestampList.OrderByDescending(x => x);
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult SignUp()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
