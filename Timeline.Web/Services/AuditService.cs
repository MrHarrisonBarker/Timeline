using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Timeline.Contexts;
using Timeline.Models;

namespace Timeline.Services
{
    public interface IAuditService
    {
        Task<IList<Audit>> GetAll();
        Task<Audit> Get(Guid auditId);
        Task<Boolean> CreateAudit(Audit audit);
        Task<Boolean> RemoveAudit(Audit audit);
    }
    public class AuditService : IAuditService
    {
        private readonly TimelineContext _timelineContext;
        
        public AuditService(TimelineContext timelineContext)
        {
            _timelineContext = timelineContext;
        }

        public async Task<IList<Audit>> GetAll()
        {
            return await _timelineContext.Audits.ToListAsync();
        }

        public async Task<Audit> Get(Guid auditId)
        {
            return await _timelineContext.Audits.Where(x => x.Id == auditId).FirstOrDefaultAsync();
        }

        public async Task<bool> CreateAudit(Audit audit)
        {
            Console.WriteLine("Creating audit");
            return _timelineContext.Audits.AddAsync(audit).IsCompletedSuccessfully;
        }

        public async Task<bool> RemoveAudit(Audit audit)
        {
            var removableAudit = await _timelineContext.Audits.Where(x => x.Id == audit.Id).FirstOrDefaultAsync();

            if (removableAudit == null)
            {
                return false;
            }
            
            _timelineContext.Audits.Remove(removableAudit);

            return true;
        }
    }

    
}