using System;

namespace Timeline.Models
{
    public class BoardAffiliation
    {
        public Guid BoardId { get; set; }
        public Board Board { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}