using System;

namespace Timeline.Models
{
    public class TeamBoard
    {
        public Guid TeamId { get; set; }
        public Team Team { get; set; }
        public Guid BoardId { get; set; }
        public Board Board { get; set; }
    }
}