using System;

namespace Timeline.Models
{
    public class JobWorker
    {
        public Guid JobId { get; set; }
        public Job Job { get; set;}
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}