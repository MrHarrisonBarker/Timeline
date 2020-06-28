using System;

namespace Timeline.Neo.Models
{
    public class BoardMember
    {
        public Guid BoardId { get; set; }
        public Board Board { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}