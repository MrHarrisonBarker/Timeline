using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using Timeline.Contexts;
using Timeline.Models;
using Timeline.Services;

namespace Timeline.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IAuditService _auditService;
        readonly ILogger<TeamsController> _log;

        public TeamsController(TimelineContext timelineContext, ILogger<TeamsController> log,
            IAuditService auditService)
        {
            _timelineContext = timelineContext;
            _auditService = auditService;
            _log = log;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IList<Team>>> GetTeams()
        {
            return await _timelineContext.Teams.Include(x => x.Owner)
                .Include(x => x.TeamBoards).ThenInclude(x => x.Board)
                .Include(x => x.TeamMembers).ThenInclude(x => x.User).ToListAsync();
        }

        [HttpPost("create")]
        public async Task<ActionResult<Team>> CreateTeam([FromBody] NewTeam newTeam)
        {
            var user = await _timelineContext.Users.Where(x => x.Id == newTeam.UserId).Include(x => x.Affiliations)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest();
            }

            // var team = new Team
            // {
            //     Name = newTeam.Team.Name, 
            //     AvatarUrl = newTeam.Team.AvatarUrl,
            //     Owner = user,
            //     Accent = newTeam.Team.Accent;
            //     TeamMembers = new List<Affiliation>()
            // };
            var team = newTeam.Team;
            team.Owner = user;
            team.TeamMembers = new List<Affiliation>();

            var affiliation = new Affiliation {UserId = user.Id, TeamId = team.Id};
            team.TeamMembers.Add(affiliation);
            team.InviteToken = Guid.NewGuid();

            _timelineContext.Teams.Add(team);
            await _timelineContext.SaveChangesAsync();

            _log.LogInformation("New team {id}, {name}", team.Id, team.Name);

            return Ok(team);
        }

        [HttpPost("JoinTeam")]
        public async Task<IActionResult> JoinTeam([FromBody] JoinTeam joinTeam)
        {
            var team = await _timelineContext.Teams.Where(x => x.InviteToken == joinTeam.InviteToken)
                .Include(x => x.TeamMembers).FirstOrDefaultAsync();

            var user = await _timelineContext.Users.Where(x => x.Id == joinTeam.UserId).FirstOrDefaultAsync();

            if (team == null || user == null)
            {
                return BadRequest();
            }

            var affiliation = new Affiliation {UserId = joinTeam.UserId, TeamId = team.Id};
            team.TeamMembers.Add(affiliation);

            Audit audit = new Audit
            {
                Action = AuditAction.UserJoinedTeam,
                Log = ($"{affiliation.UserId} joined {affiliation.TeamId}"),
                Origin = AuditOrigin.TeamsController,
                Team = team,
                TimeStamp = DateTime.Now,
                User = user
            };
            await _auditService.CreateAudit(audit);

            await _timelineContext.SaveChangesAsync();

            Console.WriteLine($"affiliation {affiliation.UserId} : {affiliation.TeamId}");
            _log.LogInformation("Creating affiliation {userId} : {TeamId}", affiliation.UserId, affiliation.TeamId);

            return Ok(team);
        }

        [HttpPost("LeaveTeam")]
        public async Task<IActionResult> LeaveTeam([FromBody] AffiliationPost affiliationPost)
        {
            var team = await _timelineContext.Teams.Where(x => x.Id == affiliationPost.TeamId)
                .Include(x => x.TeamMembers).FirstOrDefaultAsync();

            var user = await _timelineContext.Users.Where(x => x.Id == affiliationPost.UserId).FirstOrDefaultAsync();

            if (team == null)
            {
                Console.WriteLine("Can't find team");
                return BadRequest();
            }

            Console.WriteLine($"Leaving team {team.Name}");

            var affiliation = team.TeamMembers.FirstOrDefault(x =>
                x.TeamId == affiliationPost.TeamId && x.UserId == affiliationPost.UserId);

            if (affiliation == null)
            {
                Console.WriteLine("Can't find affiliation");
                return BadRequest();
            }

            Audit audit = new Audit
            {
                Action = AuditAction.UserLeftTeam,
                Log = ($"{affiliation.UserId} left {affiliation.TeamId}"),
                Origin = AuditOrigin.TeamsController,
                Team = team,
                TimeStamp = DateTime.Now,
                User = user
            };
            await _auditService.CreateAudit(audit);

            team.TeamMembers.Remove(affiliation);
            await _timelineContext.SaveChangesAsync();

            _log.LogInformation("Leaving team {userId} : {TeamId}", affiliation.UserId, affiliation.TeamId);

            return Ok(true);
        }

        [HttpPost("GenerateToken")]
        public async Task<ActionResult<Guid>> RemoveAssociation([FromBody] Guid teamId)
        {
            var team = await _timelineContext.Teams.Where(x => x.Id == teamId).FirstOrDefaultAsync();

            if (team == null)
            {
                return BadRequest();
            }

            team.InviteToken = new Guid();
            await _timelineContext.SaveChangesAsync();

            return Ok(team.InviteToken);
        }

        [HttpGet("Token/{teamId}")]
        public async Task<ActionResult<Guid>> GetToken(Guid teamId)
        {
            var team = await _timelineContext.Teams.Where(x => x.Id == teamId).FirstOrDefaultAsync();

            if (team == null)
            {
                return BadRequest();
            }

            Console.WriteLine("Getting invite token");

            if (team.InviteToken == Guid.Empty)
            {
                team.InviteToken = Guid.NewGuid();
            }

            return Ok(team.InviteToken);
        }

        [HttpGet("GetTeamBoards")]
        public async Task<ActionResult<Team>> GetTeamBoards(Guid teamId)
        {
            Console.WriteLine($"Getting all boards for Team {teamId}");
            _log.LogInformation("Getting all boards for team {teamId}", teamId);

            return await _timelineContext.Teams.Where(x => x.Id == teamId).Include(x => x.Boards)
                .ThenInclude(x => x.BoardMembers).FirstOrDefaultAsync();
        }

        [HttpGet("GetTeam")]
        public async Task<ActionResult<Team>> GetTeam(Guid teamId)
        {
            Console.WriteLine($"Getting Team {teamId}");
            _log.LogInformation("Getting team {teamId}", teamId);
            return await _timelineContext.Teams.Where(x => x.Id == teamId)
                .Include(x => x.TeamMembers).ThenInclude(x => x.User)
                .Include(x => x.TeamBoards).ThenInclude(x => x.Board).ThenInclude(x => x.BoardMembers)
                .Include(x => x.Associations).ThenInclude(x => x.Job)
                .FirstOrDefaultAsync();
        }
    }

    public class NewJob
    {
        public Job Job { get; set; }
        public User[] Users { get; set; }
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

    public class AffiliationPost
    {
        public Guid UserId { get; set; }
        public Guid TeamId { get; set; }
    }
}