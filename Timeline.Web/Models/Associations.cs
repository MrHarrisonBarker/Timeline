using System;

namespace Timeline.Models
{
    public class Associations
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid JobId { get; set; }
        public Job Job { get; set; }
        
        public Guid TeamId { get; set; }
        public Team Team { get; set; }
    }
}