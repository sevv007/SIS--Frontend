using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using CleanArchitecture.WebApi.Models;
using System.Linq;

namespace CleanArchitecture.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly string _dbPath;

        public CoursesController()
        {
            _dbPath = Path.Combine(Directory.GetCurrentDirectory(), "data", "db.json");
        }

        private async Task<DbContext> GetDbContext()
        {
            var jsonString = await System.IO.File.ReadAllTextAsync(_dbPath);
            return JsonSerializer.Deserialize<DbContext>(jsonString) ?? new DbContext();
        }

        private async Task SaveDbContext(DbContext dbContext)
        {
            var updatedJson = JsonSerializer.Serialize(dbContext, new JsonSerializerOptions { WriteIndented = true });
            await System.IO.File.WriteAllTextAsync(_dbPath, updatedJson);
        }

        // GET: api/courses - Get all courses
        [HttpGet]
        // GET: api/courses?selected=true&studentEmail=example@email.com
        public async Task<ActionResult<IEnumerable<dynamic>>> GetAllCourses([FromQuery] bool? selected = null, [FromQuery] string studentEmail = null)
        {
            try
            {
                var dbContext = await GetDbContext();
                var courses = dbContext.Courses ?? new List<Course>();
                var users = dbContext.Users ?? new List<User>();

                // Join courses with users to get student information
                var enrichedCourses = from course in courses
                                     join user in users
                                     on course.StudentId equals user.Id into courseUser
                                     from user in courseUser.DefaultIfEmpty()
                                     select new
                                     {
                                         Id = course.Id,
                                         Name = course.Name,
                                         Approved = course.Approved,
                                         Note = course.Note,
                                         Day = course.Day,
                                         Time = course.Time,
                                         Selected = course.Selected,
                                         Grade = course.Grade,
                                         ClassLevel = course.ClassLevel,
                                         StudentId = course.StudentId,
                                         StudentEmail = user?.Email
                                     };

                // Filter by selected if parameter is provided
                if (selected.HasValue)
                {
                    enrichedCourses = enrichedCourses.Where(c => c.Selected == selected.Value);
                }

                // Filter by student email if provided
                if (!string.IsNullOrEmpty(studentEmail))
                {
                    enrichedCourses = enrichedCourses.Where(c => c.StudentEmail == studentEmail);
                }

                return Ok(enrichedCourses.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/courses/student/{studentId}
        [HttpPost("student/{studentId}")]
        public async Task<ActionResult> AddStudentCourses(string studentId, [FromBody] List<Course> courses)
        {
            try
            {
                var dbContext = await GetDbContext();
                foreach (var course in courses)
                {
                    course.StudentId = studentId;
                    dbContext.Courses.Add(course);
                }

                await SaveDbContext(dbContext);
                return Ok("Courses added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/courses/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCourse(string id, [FromBody] Course updatedCourse)
        {
            try
            {
                var dbContext = await GetDbContext();
                var existingCourse = dbContext.Courses.FirstOrDefault(c => c.Id == id);

                if (existingCourse == null)
                {
                    return NotFound($"Course with ID {id} not found");
                }

                // Check if trying to approve an unselected course
                if (!existingCourse.Selected && updatedCourse.Approved)
                {
                    return BadRequest("Cannot approve a course that hasn't been selected by the student");
                }

                // Update the existing course with new values
                existingCourse.Name = updatedCourse.Name;
                existingCourse.Note = updatedCourse.Note;
                existingCourse.Day = updatedCourse.Day;
                existingCourse.Time = updatedCourse.Time;
                existingCourse.Grade = updatedCourse.Grade;
                existingCourse.ClassLevel = updatedCourse.ClassLevel;

                // Only update Selected and Approved status if appropriate
                if (existingCourse.Selected)
                {
                    existingCourse.Approved = updatedCourse.Approved;
                }
                existingCourse.Selected = updatedCourse.Selected;

                await SaveDbContext(dbContext);
                return Ok(existingCourse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
