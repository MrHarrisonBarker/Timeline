using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;
using Timeline.Migrations;

namespace Timeline.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        [JsonIgnore] public IList<Affiliation> Affiliations { get; set; }

        [NotMapped]
        [JsonProperty("Affiliations")]
        public IList<Team> Teams => Affiliations?.Select(x => x.Team).ToList();
        
        [JsonIgnore] public IList<Associations> Associations { get; set; }

        [NotMapped]
        [JsonProperty("Associations")]
        public IList<Job> Jobs => Associations?.Select(x => x.Job).ToList();
        
        // [JsonIgnore] public IList<JobWorker> Workers { get; set; }
    }
}