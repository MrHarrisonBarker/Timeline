using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timeline.Contexts;
using Timeline.Models;
using Timeline.Services;

namespace Timeline.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IAuditService _auditService;
        readonly ILogger<JobController> _log;

        public JobController(TimelineContext timelineContext, ILogger<JobController> log, IAuditService auditService)
        {
            _timelineContext = timelineContext;
            _auditService = auditService;
            _log = log;
        }

        [HttpPut("AddWorker")]
        public async Task<IActionResult> AddWorker([FromBody] WorkersUpdate workersUpdate)
        {
            var job = await _timelineContext.Jobs.Where(x => x.JobId == workersUpdate.JobId)
                .Include(x => x.AssociatedUsers).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating workers for {workersUpdate.JobId}");

            var jobWorker = new JobWorker {JobId = workersUpdate.JobId, UserId = workersUpdate.UserId};
            job.AssociatedUsers.Add(jobWorker);

            await _timelineContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("CreateJob")]
        public async Task<IActionResult> CreateJob([FromBody] NewJob newJob, Guid teamId, Guid userId)
        {
            var team = await _timelineContext.Teams.Where(x => x.Id == teamId)
                .Include(x => x.Associations).ThenInclude(x => x.Job).ThenInclude(x => x.AssociatedUsers)
                .ThenInclude(x => x.User).FirstOrDefaultAsync();

            var user = await _timelineContext.Users.Where(x => x.Id == userId).FirstOrDefaultAsync();

            if (team == null || user == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Creating job {newJob.Job.Name}");

            newJob.Job.CreatedBy = user;

            await _timelineContext.Jobs.AddAsync(newJob.Job);

            newJob.Job.AssociatedUsers = new List<JobWorker>();
            foreach (var newJobUser in newJob.Users)
            {
                var jobWorker = new JobWorker {JobId = newJob.Job.JobId, UserId = newJobUser.Id};
                newJob.Job.AssociatedUsers.Add(jobWorker);
                Console.WriteLine($"Adding job worker {jobWorker.JobId} -> {jobWorker.UserId}");
            }


            Console.WriteLine($"job id {newJob.Job.JobId}");
            _log.LogInformation("New job {name} : {id} on {teamId}", newJob.Job.Name, newJob.Job.JobId, team.Id);

            var association = new Associations {TeamId = teamId, UserId = userId, JobId = newJob.Job.JobId};
            team.Associations.Add(association);


            await _timelineContext.SaveChangesAsync();

            return Ok(newJob.Job);
        }

        [HttpPost("RemoveJob")]
        public async Task<IActionResult> RemoveJob(Guid jobId)
        {
            var job = await _timelineContext.Jobs.Where(x => x.JobId == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Deleting Job {jobId}");
            _log.LogInformation("Deleting job {name} : {id}", job.Name, job.JobId);

            _timelineContext.Jobs.Remove(job);
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("ChangeStatus")]
        public async Task<IActionResult> ChangeStatus(Guid jobId, JobStatus jobStatus)
        {
            var job = await _timelineContext.Jobs.Where(x => x.JobId == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Changing status for {jobId} to {jobStatus}");
            _log.LogInformation("Changing status {status} : {id}", jobStatus, job.JobId);

            job.JobStatus = jobStatus;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("ChangePriority")]
        public async Task<IActionResult> ChangePriority(Guid jobId, Priority priority)
        {
            var job = await _timelineContext.Jobs.Where(x => x.JobId == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Changing priority for {jobId} to {priority}");
            _log.LogInformation("Changing priority {priority} : {id}", priority, job.JobId);

            job.Priority = priority;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }
        
        [HttpPut("UpdateArchived")]
        public async Task<IActionResult> UpdateArchived([FromBody] ArchiveUpdate archiveUpdate)
        {
            var job = await _timelineContext.Jobs.Where(x => x.JobId == archiveUpdate.jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating archived for {archiveUpdate.jobId} to {archiveUpdate.archived}");
            _log.LogInformation("Updating archived {archived} : {id}", archiveUpdate.archived, job.JobId);

            job.Archived = archiveUpdate.archived;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("UpdateName")]
        public async Task<IActionResult> UpdateName([FromBody] NameUpdate nameUpdate)
        {
            var job = await _timelineContext.Jobs.Where(x => x.JobId == nameUpdate.jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating name for {nameUpdate.jobId} to {nameUpdate.name}");
            _log.LogInformation("Updating name {name} : {id}", nameUpdate.name, job.JobId);

            job.Name = nameUpdate.name;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("UpdateDescription")]
        public async Task<IActionResult> UpdateDescription([FromBody] DescriptionUpdate descriptionUpdate)
        {
            var job = await _timelineContext.Jobs.Where(x => x.JobId == descriptionUpdate.JobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating description for {descriptionUpdate.JobId} to {descriptionUpdate.Description}");
            _log.LogInformation("Updating description {description} : {id}", descriptionUpdate.Description, job.JobId);

            job.Description = descriptionUpdate.Description;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("UpdateDeadline")]
        public async Task<IActionResult> UpdateDeadline(Guid jobId, DateTime deadline)
        {
            var job = await _timelineContext.Jobs.Where(x => x.JobId == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating deadline for {jobId} to {deadline}");
            _log.LogInformation("Updating deadline {description} : {id}", deadline, job.JobId);

            job.Deadline = deadline;
            await _timelineContext.SaveChangesAsync();

            return Ok(job.Deadline);
        }
    }

    public class ArchiveUpdate
    {
        public Guid jobId { get; set; }
        public Boolean archived { get; set; }
    }

    public class WorkersUpdate
    {
        public Guid JobId { get; set; }
        public Guid UserId { get; set; }
    }

    public class NameUpdate
    {
        public Guid jobId { get; set; }
        public string name { get; set; }
    }

    public class DescriptionUpdate
    {
        public Guid JobId { get; set; }
        public string Description { get; set; }
    }
}