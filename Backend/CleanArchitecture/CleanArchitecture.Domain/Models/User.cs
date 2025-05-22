using System;

namespace CleanArchitecture.Domain.Models
{
    public class User
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Profession { get; set; }
        public string Faculty { get; set; }
        public string Branch { get; set; }
        public string TeacherFaculty { get; set; }
        public double? GPA { get; set; }
        public string Department { get; set; }
        public string StudentFaculty { get; set; }
        public string Counselor { get; set; }
    }
}
