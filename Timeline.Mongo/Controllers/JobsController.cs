using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Timeline.Mongo.Models;
using Timeline.Mongo.Services;

namespace Timeline.Mongo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly JobsService _jobsService;

        public JobsController(JobsService jobsService)
        {
            _jobsService = jobsService;
        }        
        
        [HttpGet("All")]
        public ActionResult<List<Job>> GetAll() =>
            _jobsService.Get();

        [HttpGet]
        public ActionResult<Job> Get(string id)
        {
            var job = _jobsService.Get(id);

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }
        
        // [HttpPost]
        // public ActionResult<Job> Create(Job job)
        // {
        //     _jobsService.Create(job);
        //
        //     return CreatedAtRoute("GetJob", new { id = job.Id.ToString() }, job);
        // }
        //
        // [HttpPut]
        // public IActionResult Update(string id, Job jobIn)
        // {
        //     var job = _jobsService.Get(id);
        //
        //     if (job == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     _jobsService.Update(id, jobIn);
        //
        //     return NoContent();
        // }
        //
        // [HttpDelete]
        // public IActionResult Delete(string id)
        // {
        //     var job = _jobsService.Get(id);
        //
        //     if (job == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     _jobsService.Remove(job.Id);
        //
        //     return NoContent();
        // }
    }
}