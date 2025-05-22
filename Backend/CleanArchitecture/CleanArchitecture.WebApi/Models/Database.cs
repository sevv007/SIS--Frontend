using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CleanArchitecture.WebApi.Models
{
    public class Database
    {
        [JsonPropertyName("users")]
        public List<User> Users { get; set; } = new List<User>();

        [JsonPropertyName("courses")]
        public List<Course> Courses { get; set; } = new List<Course>();
    }
}