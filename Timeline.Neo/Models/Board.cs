using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Timeline.Neo.Models
{
    public class Board
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }

        public Guid InviteToken { get; set; }
        public string Accent { get; set; }
        public bool Finished { get; set; }
        public bool Permanent { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        // Many boards to one team
        public Team Team { get; set; }

        // Many jobs to one board
        public List<Job> Jobs { get; set; }

        [JsonIgnore] public List<BoardMember> BoardMembers { get; set; }

        [JsonProperty("BoardMembers")]
        [NotMapped]
        public List<User> Members => BoardMembers?.Select(x => x.User).ToList();
    }

    public class MinimalBoardViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }

        public Guid InviteToken { get; set; }
        public string Accent { get; set; }
        public bool Finished { get; set; }
        public bool Permanent { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class SuperMinimalBoardViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Accent { get; set; }
        public bool Finished { get; set; }
        public bool Permanent { get; set; }
    }

    public class MinimalBoardViewModelWithMembers
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }

        public Guid InviteToken { get; set; }
        public string Accent { get; set; }
        public bool Finished { get; set; }
        public bool Permanent { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<MinimalUserViewModel> BoardMembers { get; set; }
    }

    public class BoardModelView
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }

        public Guid InviteToken { get; set; }
        public string Accent { get; set; }
        public bool Finished { get; set; }
        public bool Permanent { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public MinimalTeamViewModel Team { get; set; }
        public List<MinimalJobViewModel> Jobs { get; set; }
        public List<MinimalUserViewModel> BoardMembers { get; set; }
    }

    public class GetBoardViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }

        public Guid InviteToken { get; set; }
        public string Accent { get; set; }
        public bool Finished { get; set; }
        public bool Permanent { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public MinimalTeamViewModel Team { get; set; }
        public List<JobOnBoardViewModel> Jobs { get; set; }
        public List<MinimalUserViewModel> BoardMembers { get; set; }
    }
}