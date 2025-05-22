using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using CleanArchitecture.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly string _dbPath;

        public UsersController()
        {
            _dbPath = Path.Combine(Directory.GetCurrentDirectory(), "data", "db.json");
        }

        // GET: api/users - Get all users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            try
            {
                var jsonString = await System.IO.File.ReadAllTextAsync(_dbPath);
                var dbContext = JsonSerializer.Deserialize<DbContext>(jsonString);
                return Ok(dbContext?.Users ?? new List<User>());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
