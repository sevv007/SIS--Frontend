using System;
using System.Text.Json;
using System.Collections.Generic;
using System.IO;
using CleanArchitecture.Domain.Models;

namespace CleanArchitecture.Infrastructure.Services
{
    public class DataService
    {
        private readonly string _filePath = "data/db.json";

        public Database ReadDatabase()
        {
            if (!File.Exists(_filePath)) return new Database();
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<Database>(json) ?? new Database();
        }

        public void WriteDatabase(Database db)
        {
            var json = JsonSerializer.Serialize(db, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }
    }

    public class Database
    {
        public List<User> Users { get; set; } = new();
        public List<Course> Courses { get; set; } = new();
    }
}
