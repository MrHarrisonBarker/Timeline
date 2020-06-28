using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Timeline.Neo.Contexts;
using Timeline.Neo.Migrations;
using Timeline.Neo.Models;


namespace Timeline.Neo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IMapper _mapper;

        public JobController(TimelineContext timelineContext, IMapper mapper)
        {
            _timelineContext = timelineContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<JobViewModel>>> GetJobs()
        {
            var jobs = _timelineContext.Jobs.Select(x => new JobViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Board = _mapper.Map<MinimalBoardViewModel>(x.Board),
                Team = _mapper.Map<MinimalTeamViewModel>(x.Team),
                AssignedMembers = x.AssignedMembers.Select(user => _mapper.Map<MinimalUserViewModel>(user.User))
                    .ToList()
            }).ToList();

            return jobs;
        }

        [HttpGet("Get")]
        public async Task<ActionResult<JobViewModel>> GetJob(Guid jobId)
        {
            var job = _timelineContext.Jobs.Select(x => new JobViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Board = _mapper.Map<MinimalBoardViewModel>(x.Board),
                Team = _mapper.Map<MinimalTeamViewModel>(x.Team),
                AssignedMembers = x.AssignedMembers.Select(user => _mapper.Map<MinimalUserViewModel>(user.User))
                    .ToList()
            }).FirstOrDefaultAsync(x => x.Id == jobId);

            return await job;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateJob([FromBody] NewJob newJob,Guid teamId, Guid userId, Guid boardId)
        {
            Console.WriteLine($"userid {userId} : boardId {boardId}");

            var board = await _timelineContext.Boards.FirstOrDefaultAsync(x => x.Id == boardId);

            var user = await _timelineContext.Users.FirstOrDefaultAsync(x => x.Id == userId);

            var team = await _timelineContext.Teams.FirstOrDefaultAsync(x => x.Id == teamId);

            if (board == null || user == null || team == null)
            {
                return BadRequest();
            }


            await _timelineContext.Jobs.AddAsync(newJob.Job);

            newJob.Job.AssignedMembers = new List<Assignment>();
            foreach (var newJobUser in newJob.Users)
            {
                newJob.Job.AssignedMembers.Add(new Assignment {JobId = newJob.Job.Id, UserId = newJobUser.Id});
            }

            if (board.Jobs == null)
            {
                board.Jobs = new List<Job>();
            }

            if (team.Jobs == null)
            {
                team.Jobs = new List<Job>();
            }

            // Assignment assignment = new Assignment {JobId = newJob.Job.Id, UserId = newJob.UserId};
            //
            // if (user.Assignments == null)
            // {
            //     user.Assignments = new List<Assignment>();
            // }
            //
            // user.Assignments.Add(assignment);

            board.Jobs.Add(newJob.Job);
            team.Jobs.Add(newJob.Job);

            await _timelineContext.SaveChangesAsync();
            return Ok(newJob.Job);
        }

        [HttpPost("CreateBoardlessJob")]
        public async Task<IActionResult> CreateBoardlessJob([FromBody] NewJob newJob, Guid teamId, Guid userId)
        {
            var user = await _timelineContext.Users.FirstOrDefaultAsync(x => x.Id == userId);

            var team = await _timelineContext.Teams.FirstOrDefaultAsync(x => x.Id == teamId);

            if (user == null || team == null)
            {
                return BadRequest();
            }
            
            await _timelineContext.Jobs.AddAsync(newJob.Job);

            newJob.Job.AssignedMembers = new List<Assignment>();
            foreach (var newJobUser in newJob.Users)
            {
                newJob.Job.AssignedMembers.Add(new Assignment {JobId = newJob.Job.Id, UserId = newJobUser.Id});
            }
            
            if (team.Jobs == null)
            {
                team.Jobs = new List<Job>();
            }
            
            team.Jobs.Add(newJob.Job);
            
            await _timelineContext.SaveChangesAsync();
            return Ok(newJob.Job);
        }

        [HttpPost("RemoveJob")]
        public async Task<IActionResult> RemoveJob(Guid jobId)
        {
            var job = await _timelineContext.Jobs.Where(x => x.Id == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Deleting Job {jobId}");

            _timelineContext.Jobs.Remove(job);
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("AddWorker")]
        public async Task<IActionResult> AddWorker([FromBody] WorkersUpdate workersUpdate)
        {
            var job = await _timelineContext.Jobs.Where(x => x.Id == workersUpdate.JobId)
                .Include(x => x.AssignedMembers).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating workers for {workersUpdate.JobId}");

            var jobWorker = new Assignment() {JobId = workersUpdate.JobId, UserId = workersUpdate.UserId};
            job.AssignedMembers.Add(jobWorker);

            await _timelineContext.SaveChangesAsync();
            return Ok();
        }
        
        [HttpPost("ChangeStatus")]
        public async Task<IActionResult> ChangeStatus(Guid jobId, JobStatus jobStatus)
        {
            var job = await _timelineContext.Jobs.Where(x => x.Id == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Changing status for {jobId} to {jobStatus}");
            // _log.LogInformation("Changing status {status} : {id}", jobStatus, job.JobId);

            job.JobStatus = jobStatus;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("ChangePriority")]
        public async Task<IActionResult> ChangePriority(Guid jobId, Priority priority)
        {
            var job = await _timelineContext.Jobs.Where(x => x.Id == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Changing priority for {jobId} to {priority}");
            // _log.LogInformation("Changing priority {priority} : {id}", priority, job.JobId);

            job.Priority = priority;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }
        
        [HttpPut("UpdateArchived")]
        public async Task<IActionResult> UpdateArchived([FromBody] ArchiveUpdate archiveUpdate)
        {
            var job = await _timelineContext.Jobs.Where(x => x.Id == archiveUpdate.jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating archived for {archiveUpdate.jobId} to {archiveUpdate.archived}");
            // _log.LogInformation("Updating archived {archived} : {id}", archiveUpdate.archived, job.JobId);

            job.Archived = archiveUpdate.archived;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("UpdateFlag")]
        public async Task<IActionResult> UpdateFlag(Guid jobId)
        {
            Console.WriteLine(jobId);
            
            var job = await _timelineContext.Jobs.Where(x => x.Id == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating flagged for {jobId} to {!job.Flagged}");
            // _log.LogInformation("Updating flagged {archived} : {id}", !job.Flagged, job.JobId);

            job.Flagged = !job.Flagged;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("UpdateName")]
        public async Task<IActionResult> UpdateName([FromBody] NameUpdate nameUpdate)
        {
            var job = await _timelineContext.Jobs.Where(x => x.Id == nameUpdate.jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating name for {nameUpdate.jobId} to {nameUpdate.name}");
            // _log.LogInformation("Updating name {name} : {id}", nameUpdate.name, job.JobId);

            job.Name = nameUpdate.name;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("UpdateDescription")]
        public async Task<IActionResult> UpdateDescription([FromBody] DescriptionUpdate descriptionUpdate)
        {
            var job = await _timelineContext.Jobs.Where(x => x.Id == descriptionUpdate.JobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating description for {descriptionUpdate.JobId} to {descriptionUpdate.Description}");
            // _log.LogInformation("Updating description {description} : {id}", descriptionUpdate.Description, job.JobId);

            job.Description = descriptionUpdate.Description;
            await _timelineContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("UpdateDeadline")]
        public async Task<IActionResult> UpdateDeadline(Guid jobId, DateTime deadline)
        {
            var job = await _timelineContext.Jobs.Where(x => x.Id == jobId).FirstOrDefaultAsync();

            if (job == null)
            {
                return BadRequest();
            }

            Console.WriteLine($"Updating deadline for {jobId} to {deadline}");
            // _log.LogInformation("Updating deadline {description} : {id}", deadline, job.JobId);

            job.Deadline = deadline;
            await _timelineContext.SaveChangesAsync();

            return Ok(job.Deadline);
        }
    }
}