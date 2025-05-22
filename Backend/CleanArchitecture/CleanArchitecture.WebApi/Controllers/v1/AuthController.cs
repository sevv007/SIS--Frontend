using Microsoft.AspNetCore.Mvc;
using CleanArchitecture.WebApi.Models;
using CleanArchitecture.WebApi.Services;
using System.Linq;

namespace CleanArchitecture.WebApi.Controllers.v1
{
    [ApiController]
    [Route("api/users")]
    public class AuthController : ControllerBase
    {
        private readonly DataService _dataService;

        public AuthController(DataService dataService)
        {
            _dataService = dataService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            var db = _dataService.ReadDatabase();
            var user = db.Users.FirstOrDefault(u => u.Email == loginUser.Email && u.Password == loginUser.Password);

            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            var db = _dataService.ReadDatabase();

            if (db.Users.Any(u => u.Email == newUser.Email))
            {
                return BadRequest("Email already exists");
            }

            db.Users.Add(newUser);
            _dataService.WriteDatabase(db);

            return Ok(newUser);
        }
    }
}