using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timeline.Neo.Helpers;
using Timeline.Neo.Contexts;
using Timeline.Neo.Models;
using Timeline.Neo.Services;

namespace Timeline.Neo.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        readonly ILogger<UserController> _log;

        public UserController(TimelineContext timelineContext, IUserService userService, IMapper mapper,ILogger<UserController> logger)
        {
            _timelineContext = timelineContext;
            _userService = userService;
            _mapper = mapper;
            _log = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IList<MinimalUserViewModel>>> GetUsers()
        {
            return await _timelineContext.Users.Select(x => _mapper.Map<MinimalUserViewModel>(x)).ToListAsync();
        }
        
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] Authenticate model)
        {

            var user = _userService.Authenticate(model.Email, model.Password);

            if (user == null)
            {
                return Ok(user);
            }

            _log.LogInformation("Authenticating user {email}", model.Email);

            return Ok(user);
        }

        [HttpPost("lilAuth")]
        public async Task<ActionResult<User>> LilAuth([FromBody] LilAUth auth)
        {
            var user = await _timelineContext.Users.Select(x => new UserViewModel
            {
                Id = x.Id,
                Avatar = x.Avatar,
                DisplayName = x.DisplayName,
                Email = x.Email,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Assignments = x.Assignments.Select(assignment => _mapper.Map<MinimalJobViewModel>(assignment.Job)).ToList(),
                BoardMemberships = x.BoardMemberships.Select(membership => _mapper.Map<MinimalBoardViewModel>(membership.Board)).ToList(),
                Employments = x.Employments.Select(employment => _mapper.Map<MinimalTeamViewModel>(employment.Team)).ToList()
            }).SingleOrDefaultAsync(x => x.Email == auth.Email);

            if (user == null)
            {
                return BadRequest();
            }

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

            return Ok(user.WithoutPassword());
        }
    }
}