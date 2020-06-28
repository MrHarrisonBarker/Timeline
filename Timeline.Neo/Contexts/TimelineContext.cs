using Microsoft.EntityFrameworkCore;
using Timeline.Neo.Models;

namespace Timeline.Neo.Contexts
{
    public class TimelineContext : DbContext
    {
        public TimelineContext(DbContextOptions<TimelineContext> dbContextOptions) : base(dbContextOptions)
        {
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Board> Boards { get; set; }
        
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<BoardMember> BoardMembers { get; set; }
        public DbSet<Employment> Employments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            // Employments *** User <-> Team
            modelBuilder.Entity<Employment>()
                .HasKey(t => new { t.UserId, t.TeamId });

            modelBuilder.Entity<Employment>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.Employments)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<Employment>()
                .HasOne(pt => pt.Team)
                .WithMany(t => t.Employments)
                .HasForeignKey(pt => pt.TeamId);
            
            // Assignments *** User <-> Job
            modelBuilder.Entity<Assignment>()
                .HasKey(t => new { t.UserId, t.JobId });

            modelBuilder.Entity<Assignment>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.Assignments)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<Assignment>()
                .HasOne(pt => pt.Job)
                .WithMany(t => t.AssignedMembers)
                .HasForeignKey(pt => pt.JobId);
            
            // Board Members *** User <-> Board
            modelBuilder.Entity<BoardMember>()
                .HasKey(t => new { t.UserId, t.BoardId });

            modelBuilder.Entity<BoardMember>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.BoardMemberships)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<BoardMember>()
                .HasOne(pt => pt.Board)
                .WithMany(t => t.BoardMembers)
                .HasForeignKey(pt => pt.BoardId);
            
            // Ownerships -> Owner
            modelBuilder.Entity<User>()
                .HasMany(c => c.Ownerships)
                .WithOne(e => e.Owner);
            
            // Boards -> Team
            modelBuilder.Entity<Team>()
                .HasMany(c => c.Boards)
                .WithOne(e => e.Team);
            
            // Jobs -> Board
            modelBuilder.Entity<Board>()
                .HasMany(c => c.Jobs)
                .WithOne(e => e.Board);
            
            // Jobs -> Team
            modelBuilder.Entity<Team>()
                .HasMany(c => c.Jobs)
                .WithOne(e => e.Team);
        }
    }
}