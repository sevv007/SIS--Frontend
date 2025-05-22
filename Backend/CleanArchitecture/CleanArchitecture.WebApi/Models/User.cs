using System;
using System.Text.Json.Serialization;

namespace CleanArchitecture.WebApi.Models
{
    public class User
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("username")]
        public string Username { get; set; } = string.Empty;

        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("password")]
        public string Password { get; set; } = string.Empty;

        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty;

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("phone")]
        public string Phone { get; set; } = string.Empty;

        [JsonPropertyName("profession")]
        public string Profession { get; set; } = string.Empty;

        [JsonPropertyName("faculty")]
        public string Faculty { get; set; } = string.Empty;

        [JsonPropertyName("branch")]
        public string Branch { get; set; }

        [JsonPropertyName("gpa")]
        public double? GPA { get; set; }

        [JsonPropertyName("department")]
        public string Department { get; set; }

        [JsonPropertyName("studentFaculty")]
        public string StudentFaculty { get; set; }

        [JsonPropertyName("counselor")]
        public string Counselor { get; set; }
    }
}
