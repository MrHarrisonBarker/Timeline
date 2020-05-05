using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timeline.Contexts;
using Timeline.Models;
using Timeline.Services;

namespace Timeline.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuditController: ControllerBase
    {
        private readonly TimelineContext _timelineContext;
        private readonly IAuditService _auditService;

        public AuditController(TimelineContext timelineContext, IAuditService auditService)
        {
            _auditService = auditService;
            _timelineContext = timelineContext;
        }

        [HttpGet("GetAudits")]
        public async Task<ActionResult<IList<Audit>>> GetAudits()
        {
            return await _timelineContext.Audits.ToListAsync();
        }
    }
}