using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Timeline.Mongo.Models;
using Timeline.Mongo.Services;

namespace Timeline.Mongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly TeamsService _teamsService;
        private readonly JobsService _jobsService;

        public TeamsController(TeamsService teamsService, JobsService jobsService)
        {
            _teamsService = teamsService;
            _jobsService = jobsService;
        }

        [HttpGet("All")]
        public ActionResult<List<Team>> GetAll() =>
            _teamsService.Get();

        [HttpGet(Name = "GetTeam")]
        public ActionResult<Team> Get(string id)
        {
            var team = _teamsService.Get(id);
            
            if (team == null)
            {
                return NotFound();
            }
            
            team.Jobs = _jobsService.GetJobList(team.JobIds);

            return team;
        }

        [HttpPost("Create")]
        public ActionResult<Team> Create([FromBody]Team team)
        {
            _teamsService.Create(team);

            return CreatedAtRoute("GetTeam", new {id = team.Id.ToString()}, team);
        }

        [HttpPut]
        public IActionResult Update(string id, Team teamIn)
        {
            var team = _teamsService.Get(id);

            if (team == null)
            {
                return NotFound();
            }

            _teamsService.Update(id, teamIn);

            return NoContent();
        }

        [HttpDelete]
        public IActionResult Delete(string id)
        {
            var team = _teamsService.Get(id);

            if (team == null)
            {
                return NotFound();
            }

            _teamsService.Remove(team.Id);

            return NoContent();
        }
    }
}