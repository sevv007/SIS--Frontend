using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace CleanArchitecture.WebApi.Models
{
    public class DbContext
    {
        [JsonPropertyName("users")]
        public List<User> Users { get; set; } = new List<User>();

        [JsonPropertyName("courses")]
        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
