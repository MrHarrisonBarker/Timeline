using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Newtonsoft.Json;

namespace Timeline.Neo.Models
{
    public class Job
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [AllowNull] public DateTime Deadline { get; set; }
        public bool Finished { get; set; }
        public bool Archived { get; set; }
        public JobStatus JobStatus { get; set; }
        public JobType JobType { get; set; }
        public string AssociatedUrl { get; set; }
        public string Commit { get; set; }
        public int Pings { get; set; }
        public bool Flagged { get; set; }
        public Priority Priority { get; set; }
        public bool Backlog { get; set; }

        // Many jobs to one board
        public Board Board { get; set; }

        // Many jobs to one team
        public Team Team { get; set; }

        [JsonIgnore] public List<Assignment> AssignedMembers { get; set; }

        [NotMapped]
        [JsonProperty("AssignedMembers")]
        public List<User> Members => AssignedMembers?.Select(x => x.User).ToList();
    }

    public class JobViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Deadline { get; set; }
        public bool Finished { get; set; }
        public bool Archived { get; set; }
        public JobStatus JobStatus { get; set; }
        public JobType JobType { get; set; }
        public string AssociatedUrl { get; set; }
        public string Commit { get; set; }
        public int Pings { get; set; }
        public bool Flagged { get; set; }
        public Priority Priority { get; set; }
        public bool Backlog { get; set; }

        // Many jobs to one board
        public MinimalBoardViewModel Board { get; set; }

        // Many jobs to one team
        public MinimalTeamViewModel Team { get; set; }

        public List<MinimalUserViewModel> AssignedMembers { get; set; }
    }

    public class JobOnBoardViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Deadline { get; set; }
        public bool Finished { get; set; }
        public bool Archived { get; set; }
        public JobStatus JobStatus { get; set; }
        public JobType JobType { get; set; }
        public string AssociatedUrl { get; set; }
        public string Commit { get; set; }
        public int Pings { get; set; }
        public bool Flagged { get; set; }
        public Priority Priority { get; set; }
        public bool Backlog { get; set; }

        public List<SuperMinimalUserViewModel> AssignedMembers { get; set; }
        public SuperMinimalTeamViewModel Team { get; set; }
    }

    public class MinimalJobViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Deadline { get; set; }
        public bool Finished { get; set; }
        public bool Archived { get; set; }
        public JobStatus JobStatus { get; set; }
        public JobType JobType { get; set; }
        public string AssociatedUrl { get; set; }
        public string Commit { get; set; }
        public int Pings { get; set; }
        public bool Flagged { get; set; }
        public Priority Priority { get; set; }
        public bool Backlog { get; set; }
    }

    public class MinimalJobViewModelWithBoard
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Deadline { get; set; }
        public bool Finished { get; set; }
        public bool Archived { get; set; }
        public JobStatus JobStatus { get; set; }
        public JobType JobType { get; set; }
        public string AssociatedUrl { get; set; }
        public string Commit { get; set; }
        public int Pings { get; set; }
        public bool Flagged { get; set; }
        public Priority Priority { get; set; }
        public bool Backlog { get; set; }

        public SuperMinimalBoardViewModel Board { get; set; }
        public SuperMinimalTeamViewModel Team { get; set; }
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
        ToDo,
        InProgress,
        Verify,
        Completed
    }

    public class NewJob
    {
        public Job Job { get; set; }
        public User[] Users { get; set; }
    }

    public class ArchiveUpdate
    {
        public Guid jobId { get; set; }
        public Boolean archived { get; set; }
    }

    public class WorkersUpdate
    {
        public Guid JobId { get; set; }
        public Guid UserId { get; set; }
    }

    public class NameUpdate
    {
        public Guid jobId { get; set; }
        public string name { get; set; }
    }

    public class DescriptionUpdate
    {
        public Guid JobId { get; set; }
        public string Description { get; set; }
    }
}