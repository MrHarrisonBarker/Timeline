using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Timeline.Neo.Models
{
    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public string Avatar { get; set; }
        
        public Guid InviteToken { get; set; }
        public string Description { get; set; }
        public string Accent { get; set; }

        // Many teams to one user
        public User Owner { get; set; }
        
        // Many boards to one team
        public List<Board> Boards { get; set; }
        
        // Many jobs to one team
        public List<Job> Jobs { get; set; }

        [JsonIgnore] public List<Employment> Employments { get; set; }
        [NotMapped] [JsonProperty("Employments")] public List<User> Users => Employments?.Select(x => x.User).ToList();
    }

    public class MinimalTeamViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public Guid InviteToken { get; set; }
        public string Description { get; set; }
        public string Accent { get; set; }
    }
    
    public class SuperMinimalTeamViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Accent { get; set; }
    }

    public class TeamViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        
        public Guid InviteToken { get; set; }
        public string Description { get; set; }
        public string Accent { get; set; }
        public MinimalUserViewModel Owner { get; set; }
        public List<MinimalBoardViewModelWithMembers> Boards { get; set; }
        public List<MinimalJobViewModel> Jobs { get; set; }
        public List<MinimalUserViewModel> Employments { get; set; }
    }
    
    public class TeamViewModelWithSuperJobBoard
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        
        public Guid InviteToken { get; set; }
        public string Description { get; set; }
        public string Accent { get; set; }
        public MinimalUserViewModel Owner { get; set; }
        public List<MinimalBoardViewModelWithMembers> Boards { get; set; }
        public List<MinimalJobViewModelWithBoard> Jobs { get; set; }
        public List<MinimalUserViewModel> Employments { get; set; }
    }
}