using System;

namespace Timeline.Models
{
    public class Affiliation
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid TeamId { get; set; }
        public Team Team { get; set; }
    }
}