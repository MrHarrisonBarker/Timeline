using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Timeline.Models
{
    public class Board
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string AvatarUrl { get; set; }
        public Guid InviteToken { get; set; }
        public string Description { get; set; }
        public string Accent { get; set; }

        [JsonIgnore] public IList<BoardAffiliation> BoardMembers { get; set; }

        [NotMapped]
        [JsonProperty("BoardMembers")]
        public IList<User> Users => BoardMembers?.Select(x => x.User).ToList();
        
        [JsonIgnore] public IList<Associations> Associations { get; set; }

        [NotMapped]
        [JsonProperty("Jobs")]
        public IList<Job> Jobs => Associations?.Select(x => x.Job).ToList();
    }
}