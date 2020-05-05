using Microsoft.EntityFrameworkCore;
using Timeline.Models;

namespace Timeline.Contexts
{
    public class TimelineContext : DbContext
    {
        public TimelineContext(DbContextOptions<TimelineContext> dbContextOptions) : base(dbContextOptions)
        {
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Job> Jobs { get; set; }
        
        public DbSet<Audit> Audits { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // modelBuilder.Entity<Job>()
                // .HasMany(p => p.Tags);
            
            
            modelBuilder.Entity<Affiliation>()
                .HasKey(pt => new {pt.UserId, pt.TeamId});

            modelBuilder.Entity<Affiliation>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.Affiliations)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<Affiliation>()
                .HasOne(pt => pt.Team)
                .WithMany(x => x.Affiliations)
                .HasForeignKey(pt => pt.TeamId);
            
            
            
            
            
            
            modelBuilder.Entity<JobWorker>()
                .HasKey(pt => new {pt.UserId, pt.JobId});

            

            modelBuilder.Entity<JobWorker>()
                .HasOne(pt => pt.Job)
                .WithMany(x => x.AssociatedUsers)
                .HasForeignKey(pt => pt.JobId);
            
            modelBuilder.Entity<JobWorker>()
                .HasOne(pt => pt.User)
                .WithMany()
                .HasForeignKey(pt => pt.UserId);
            
            
            
            
            
            modelBuilder.Entity<Associations>()
                .HasKey(pt => new {pt.UserId, pt.JobId, pt.TeamId});

            modelBuilder.Entity<Associations>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.Associations)
                .HasForeignKey(pt => pt.UserId);
            
            modelBuilder.Entity<Associations>()
                .HasOne(pt => pt.Team)
                .WithMany(p => p.Associations)
                .HasForeignKey(pt => pt.TeamId);

            modelBuilder.Entity<Associations>()
                .HasOne(pt => pt.Job)
                .WithMany()
                .HasForeignKey(pt => pt.JobId);
        }
    }
}