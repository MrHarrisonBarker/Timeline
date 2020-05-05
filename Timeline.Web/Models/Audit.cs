using System;

namespace Timeline.Models
{
    public class Audit
    {
        public Guid Id { get; set; }
        public DateTime TimeStamp { get; set; }
        public AuditAction Action { get; set; }
        public string Log { get; set; }
        public AuditOrigin Origin { get; set; }
        public User User { get; set; }
        public Team Team { get; set; }
    }

    public enum AuditOrigin
    {
        JobController,
        TeamsController,
        UserController
    }

    public enum AuditAction
    {
        UserJoinedTeam,
        UserLeftTeam,
    }
}