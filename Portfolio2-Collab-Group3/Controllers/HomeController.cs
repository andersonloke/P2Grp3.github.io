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
using Microsoft.AspNetCore.Http;
using FirebaseAuth;
using FireSharp;
using FireSharp.Response;
using FireSharp.Interfaces;
using Newtonsoft.Json;
using FireSharp.Serialization;
using FireSharp.Config;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Firebase;
using Microsoft.Graph;

namespace Portfolio2_Collab_Group3.Controllers
{
    public class HomeController : Controller
    {
        private static string ApiKey = "AIzaSyAHvskhefCdxouzYqTqkSE2-SA8B2D4nyk";
        private static string Bucket = "https://portfolio-2-6e9fc.firebaseio.com/";
        private readonly ILogger<HomeController> _logger;

        IFirebaseConfig config = new FireSharp.Config.FirebaseConfig
        { 
            AuthSecret = "4d166698352efc70aaf80bd776076d509f75d586",
            BasePath = "https://portfolio-2-6e9fc.firebaseio.com/"
        };

        /*IFirebaseClient client = new FireSharp.FirebaseClient(config);*/

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        ////GET: Account
        //[AllowAnonymous]
        //[HttpGet]
        //public async Task<IActionResult> Login(string returnUrl)
        //{
        //    try
        //    {
        //        //Verificatiom
        //        if (this.Request.isAuthenticated)
        //        {
        //            //return this.RedirectToLocal(returnUrl);
        //        }

        //        FirebaseResponse response = await client.GetAsync("todos/set");
        //        Todo todo = response.ResultAs<Todo>(); //The response will contain the data being retreived
        //    }
        //    catch (Exception ex)
        //    {
        //        //Info
        //        Console.Write(ex);

        //    }

        //    //Info
        //    return this.View();
        //}

        //[HttpPost]
        //[AllowAnonymous]
        //public async Task<IActionResult> Login(Login model)
        //{
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            var auth = new FirebaseAuthProvider(new FirebaseAuth.FirebaseConfig(ApiKey));
        //            var x = await auth.SignInWithEmailAndPasswordAsync(model.Email, model.Password);
        //            string token = x.FirebaseToken;
        //            var user = x.User;
        //            if (token != "")
        //            {
        //                this.SignInUser(user.Email, token, false);
        //                return this.RedirectToAction("Index", "Home");
        //            }
        //            else
        //            {
        //                ModelState.AddModelError(string.Empty, "Invalid email or password.");
        //            }
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        ModelState.AddModelError(string.Empty, ex.Message);
        //    }
        //    return View();
        //}


        public IActionResult SignUp()
        {
            return View();
        }

        //[HttpPost]
        //[AllowAnonymous]
        //public async Task<IActionResult> SignUp(UserData ud)
        //{
        //    try
        //    {
        //        var auth = new FirebaseAuthProvider(new FirebaseAuth.FirebaseConfig(ApiKey));
        //        var x = await auth.CreateUserWithEmailAndPasswordAsync(ud.Email.ToLower(), ud.Password, ud.UserName);
        //        ModelState.AddModelError(string.Empty, "Please verify your email then login please.");
        //        return RedirectToAction("Index", "Home");
        //    }
        //    catch (Exception ex)
        //    {
                
        //        ModelState.AddModelError(string.Empty, ex.Message);
        //    }
        //    return View();
        //}


        //public IActionResult Privacy()
        //{
        //    return View();
        //}

        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}

        //public void AddToFirebase(UserData ud)
        //{

        //}
    }
}
