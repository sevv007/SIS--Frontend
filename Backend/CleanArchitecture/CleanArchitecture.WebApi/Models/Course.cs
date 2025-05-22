using System.Text.Json.Serialization;

namespace CleanArchitecture.WebApi.Models
{
    public class Course
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("approved")]
        public bool Approved { get; set; }

        [JsonPropertyName("note")]
        public string Note { get; set; }

        [JsonPropertyName("day")]
        public string Day { get; set; }

        [JsonPropertyName("time")]
        public string Time { get; set; }

        [JsonPropertyName("selected")]
        public bool Selected { get; set; }

        [JsonPropertyName("grade")]
        public string Grade { get; set; }

        [JsonPropertyName("classLevel")]
        public string ClassLevel { get; set; }

        [JsonPropertyName("studentId")]
        public string StudentId { get; set; }
    }
}
