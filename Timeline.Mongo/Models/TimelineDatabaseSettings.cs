namespace Timeline.Mongo.Models
{
    public class TimelineDatabaseSettings : ITimelineDatabaseSettings
    {
        public string JobsCollectionName { get; set; }
        public string TeamsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ITimelineDatabaseSettings
    {
        string JobsCollectionName { get; set; }
        string TeamsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}