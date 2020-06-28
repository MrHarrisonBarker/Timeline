using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timeline.Neo.Contexts;
using Timeline.Neo.Models;

namespace Timeline.Neo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IMapper _mapper;

        public TeamController(TimelineContext timelineContext, IMapper mapper)
        {
            _timelineContext = timelineContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Team>>> GetTeams()
        {
            return await _timelineContext.Teams
                .Include(x => x.Owner)
                .Include(x => x.Boards)
                .Include(x => x.Employments)
                .Include(x => x.Jobs).ToListAsync();
        }

        [HttpGet("GetTeam")]
        public async Task<ActionResult<TeamViewModelWithSuperJobBoard>> GetTeam(Guid teamId)
        {
            var team = _timelineContext.Teams.Select(x => new TeamViewModelWithSuperJobBoard
            {
                Id = x.Id,
                Avatar = x.Avatar,
                Name = x.Name,
                Accent = x.Accent,
                Description = x.Description,
                Owner = _mapper.Map<MinimalUserViewModel>(x.Owner),
                Boards = x.Boards.Select(board => new MinimalBoardViewModelWithMembers
                {
                    Avatar = board.Avatar,
                    Description = board.Description,
                    Id = board.Id,
                    Name = board.Name,
                    Accent = board.Accent,
                    InviteToken = board.InviteToken,
                    Finished = board.Finished,
                    Permanent = board.Permanent,
                    StartDate = board.StartDate,
                    EndDate = board.EndDate,
                    BoardMembers = board.BoardMembers.Select(member => _mapper.Map<MinimalUserViewModel>(member.User)).ToList()
                }).ToList(),
                Jobs = x.Jobs.Where(job => !job.Archived).Select(job => new MinimalJobViewModelWithBoard
                {
                    Id = job.Id,
                    Archived = job.Archived,
                    Backlog = job.Backlog,
                    AssociatedUrl = job.AssociatedUrl,
                    Commit = job.Commit,
                    Deadline = job.Deadline,
                    Description = job.Description,
                    EndDate = job.EndDate,
                    Finished = job.Finished,
                    Flagged = job.Flagged,
                    JobStatus = job.JobStatus,
                    JobType = job.JobType,
                    Name = job.Name,
                    Pings = job.Pings,
                    Priority = job.Priority,
                    StartDate = job.StartDate,
                    Board = _mapper.Map<SuperMinimalBoardViewModel>(job.Board),
                    Team = _mapper.Map<SuperMinimalTeamViewModel>(job.Team)
                }).ToList(),
                Employments = x.Employments.Select(employment => _mapper.Map<MinimalUserViewModel>(employment.User))
                    .ToList()
            }).FirstOrDefaultAsync(x => x.Id == teamId);

            return await team;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Team>> CreateTeam([FromBody] NewTeam newTeam)
        {
            var user = await _timelineContext.Users.Where(x => x.Id == newTeam.UserId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest();
            }

            var team = newTeam.Team;
            team.InviteToken = Guid.NewGuid();
            team.Owner = user;
            team.Employments = new List<Employment>();
            if (user.Employments == null)
            {
                user.Employments = new List<Employment>();
            }

            var employment = new Employment {UserId = user.Id, TeamId = team.Id};
            team.Employments.Add(employment);
            user.Employments.Add(employment);

            _timelineContext.Teams.Add(team);
            await _timelineContext.SaveChangesAsync();

            Console.WriteLine("Created Team");

            return Ok(team);
        }

        [HttpPost("Join")]
        public async Task<IActionResult> Join([FromBody] JoinTeam joinTeam)
        {
            var team = await _timelineContext.Teams.Where(x => x.Id == joinTeam.InviteToken)
                .Include(x => x.Employments).FirstOrDefaultAsync();

            var user = await _timelineContext.Users.Where(x => x.Id == joinTeam.UserId).FirstOrDefaultAsync();

            if (team == null || user == null)
            {
                return BadRequest();
            }

            var employment = new Employment {UserId = joinTeam.UserId, TeamId = team.Id};
            team.Employments.Add(employment);

            await _timelineContext.SaveChangesAsync();

            Console.WriteLine($"employment {employment.UserId} : {employment.TeamId}");

            return Ok(team);
        }

        public class NewTeam
        {
            public Team Team { get; set; }
            public Guid UserId { get; set; }
        }

        public class JoinTeam
        {
            public Guid UserId { get; set; }
            public Guid InviteToken { get; set; }
        }
    }
}