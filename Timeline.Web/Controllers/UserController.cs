using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timeline.Contexts;
using Timeline.Helpers;
using Timeline.Models;
using Timeline.Services;

namespace Timeline.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IUserService _userService;
        readonly ILogger<UserController> _log;

        public UserController(TimelineContext timelineContext, IUserService userService, ILogger<UserController> log)
        {
            _log = log;
            _timelineContext = timelineContext;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] Authenticate model)
        {
            Console.WriteLine($"Authenticating User {model.Password}");

            var user = _userService.Authenticate(model.Email, model.Password);

            if (user == null)
            {
                return Ok(user);
            }

            _log.LogInformation("Authenticating user {email}", model.Email);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (_timelineContext.Users.SingleOrDefault(x => x.Email == user.Email) != null)
            {
                return BadRequest(new {message = "User already exists"});
            }

            await _userService.CreateUser(user);

            _log.LogInformation("Created user {id}, {name}", user.Id, user.DisplayName);
            return Ok(user.WithoutPassword());
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IList<User>>> GetUsers()
        {
            return await _timelineContext.Users
                .Include(x => x.Affiliations).ThenInclude(x => x.Team)
                .Include(x => x.Associations).ThenInclude(x => x.Job).ToListAsync();
        }

        // [AllowAnonymous]
        [HttpGet("teams")]
        public async Task<ActionResult<User>> GetUserTeams(Guid userId)
        {
            Console.WriteLine($"Getting User {userId} teams");
            _log.LogInformation("Getting User {id} teams", userId);
            return await _timelineContext.Users
                .Include(x => x.Affiliations).ThenInclude(x => x.Team)
                .Include(x => x.Associations).ThenInclude(x => x.Job).ThenInclude(x => x.AssociatedUsers)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }


        [HttpGet("jobs")]
        public async Task<ActionResult<User>> GetUserJobs(Guid userId)
        {
            Console.WriteLine($"Getting User {userId} jobs");
            _log.LogInformation("Getting User {id} jobs", userId);
            // return await _timelineContext.Users
            //     .Include(x => x.Associations)
            //     .ThenInclude(x => x.Job)
            //     .ThenInclude(x => x.AssociatedUsers)
            //     .ThenInclude(x => x.User)
            //     .FirstOrDefaultAsync(x => x.Id == userId);
            // .Where(x => x.AssociatedUsers.Any(u => u.UserId == userId))
            // return await _timelineContext.Job.Include(x => x.AssociatedUsers).ThenInclude(x => x.User).ToListAsync();
            return await _timelineContext.Users.Where(x => x.Id == userId).Include(x => x.Associations)
                .ThenInclude(x => x.Job).ThenInclude(x => x.AssociatedUsers).ThenInclude(x => x.User)
                .FirstOrDefaultAsync();
        }

        [HttpPost("CreateAffiliation")]
        public async Task<IActionResult> CreateAffiliation([FromBody] AffiliationPost affiliationPost)
        {
            var user = await _timelineContext.Users.Where(x => x.Id == affiliationPost.UserId)
                .Include(x => x.Affiliations).FirstOrDefaultAsync();
            if (user == null)
            {
                return BadRequest();
            }

            var affiliation = new Affiliation {UserId = affiliationPost.UserId, TeamId = affiliationPost.TeamId};

            user.Affiliations.Add(affiliation);
            await _timelineContext.SaveChangesAsync();

            Console.WriteLine($"affiliation {affiliation.UserId} : {affiliation.TeamId}");
            _log.LogInformation("Creating affiliation {userId} : {TeamId}", affiliation.UserId, affiliation.TeamId);

            return Ok();
        }
    }
}