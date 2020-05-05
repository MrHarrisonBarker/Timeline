using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Timeline.Models
{
    public class Job
    {
        public Guid JobId { get; set; }
        public User CreatedBy { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Deadline { get; set; }
        public bool Finished { get; set; }
        public bool Archived { get; set; }

        //TODO More complex job type with status and other configs
        public JobStatus JobStatus { get; set; }
        public JobType JobType { get; set; }
        public string AssociatedUrl { get; set; }
        public string Commit { get; set; }
        public int Pings { get; set; }
        public bool Flagged { get; set; }
        // [NotMapped] public string[] Tags { get; set; }
        public Priority Priority { get; set; }

        [JsonIgnore] public IList<JobWorker> AssociatedUsers { get; set; }

        [NotMapped]
        [JsonProperty("AssociatedUsers")]
        public IList<Guid> Users => AssociatedUsers?.Select(x => x.User.Id).ToList();

        // [NotMapped] public string[] T => Tags.Select(x => x).ToArray();
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