using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Timeline.Mongo.Models
{
    public class Job
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement("Name")]
        public string Issue { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishedDate { get; set; }
        public DateTime DeadLine { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool Finished { get; set; }
        public bool Archived { get; set; }
        public string Commit { get; set; }

        public JobStatus JobStatus { get; set; }
        public JobType JobType { get; set; }
        public Priority Priority { get; set; }
        
        public ObjectId Team { get; set; }
    }

    public enum Priority
    {
        DEFCON5,
        DEFCON4,
        DEFCON3,
        DEFCON2,
        DEFCON1
    }

    public enum JobType
    {
        Bug,
        Feature,
        Generic
    }

    public enum JobStatus
    {
        Backlog,
        ToDo,
        InProgress,
        Verify,
        Completed
    }
}