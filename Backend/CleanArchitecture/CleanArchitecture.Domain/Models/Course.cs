namespace CleanArchitecture.Domain.Models
{
    public class Course
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool Approved { get; set; }
        public string Note { get; set; }
        public string Day { get; set; }
        public string Time { get; set; }
        public bool Selected { get; set; }
        public string Grade { get; set; }
        public string ClassLevel { get; set; }
        public string StudentId { get; set; }
    }
}
