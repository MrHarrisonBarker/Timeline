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
        public string Description { get; set; }
        public string Accent { get; set; }

        [JsonIgnore] public IList<Affiliation> TeamMembers { get; set; }

        [NotMapped]
        [JsonProperty("TeamMembers")]
        public IList<User> Users => TeamMembers?.Select(x => x.User).ToList();

        [JsonIgnore] public IList<TeamBoard> TeamBoards { get; set; }

        [NotMapped] [JsonProperty("Boards")] 
        public IList<Board> Boards => TeamBoards?.Select(x => x.Board).ToList();
        
        [JsonIgnore] public IList<Associations> Associations { get; set; }

        [NotMapped] [JsonProperty("Jobs")] 
        public IList<Job> Jobs => Associations?.Select(x => x.Job).ToList();

        // [JsonIgnore] public IList<Associations> Associations { get; set; }
        //
        // [NotMapped]
        // [JsonProperty("Associations")]
        // public IList<Job> Jobs => Associations?.Select(x => x.Job).ToList();
    }
}