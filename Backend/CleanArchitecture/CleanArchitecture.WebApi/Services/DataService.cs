using System.Text.Json;
using CleanArchitecture.WebApi.Models;
using System.IO;

namespace CleanArchitecture.WebApi.Services
{
    public class DataService
    {
        private readonly string _filePath = "data/db.json";

        public Database ReadDatabase()
        {
            if (!File.Exists(_filePath))
            {
                return new Database();
            }

            var json = File.ReadAllText(_filePath);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            return JsonSerializer.Deserialize<Database>(json, options) ?? new Database();
        }

        public void WriteDatabase(Database db)
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };

            var json = JsonSerializer.Serialize(db, options);
            Directory.CreateDirectory(Path.GetDirectoryName(_filePath));
            File.WriteAllText(_filePath, json);
        }
    }
}