using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Timeline.Models
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public User Owner { get; set; }
        public string AvatarUrl { get; set; }
        public Guid InviteToken { get; set; }
        
        [JsonIgnore] public IList<Affiliation> Affiliations { get; set; }

        [NotMapped]
        [JsonProperty("Affiliations")]
        public IList<User> Users => Affiliations?.Select(x => x.User).ToList();
        
        [JsonIgnore] public IList<Associations> Associations { get; set; }

        [NotMapped]
        [JsonProperty("Associations")]
        public IList<Job> Jobs => Associations?.Select(x => x.Job).ToList();
    }
}