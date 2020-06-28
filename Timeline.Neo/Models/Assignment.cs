using System;

namespace Timeline.Neo.Models
{
    public class Assignment
    {
        public Guid JobId { get; set; }
        public Job Job { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}