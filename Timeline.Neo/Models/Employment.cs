using System;

namespace Timeline.Neo.Models
{
    public class Employment
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid TeamId { get; set; }
        public Team Team { get; set; }
    }
}