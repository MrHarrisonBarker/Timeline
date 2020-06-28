using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using SaasKit.Multitenancy;
using Timeline.Neo.Contexts;
using Timeline.Neo.Models;

namespace Timeline.Neo
{
    public class CachingTeamResolver : MemoryCacheTenantResolver<Team>
    {
        private readonly TimelineContext _timelineContext;

        public CachingTeamResolver(TimelineContext timelineContext,IMemoryCache cache, ILoggerFactory loggerFactory) : base(cache, loggerFactory)
        {
            _timelineContext = timelineContext;
        }
        
        // Resolver runs on cache misses
        protected override async Task<TenantContext<Team>> ResolveAsync(HttpContext context)
        {
            var subdomain = context.Request.Host.Host.ToLower();

            var tenant = await _timelineContext.Teams
                .FirstOrDefaultAsync(t => t.Domain == subdomain);

            if (tenant == null) return null;

            return new TenantContext<Team>(tenant);
        }

        protected override MemoryCacheEntryOptions CreateCacheEntryOptions()
            => new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromHours(2));

        protected override string GetContextIdentifier(HttpContext context)
            => context.Request.Host.Host.ToLower();

        protected override IEnumerable<string> GetTenantIdentifiers(TenantContext<Team> context)
            => new string[] { context.Tenant.Domain };
        
    }
}