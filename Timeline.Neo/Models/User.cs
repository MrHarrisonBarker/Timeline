using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Newtonsoft.Json;

namespace Timeline.Neo.Models
{
    public class Authenticate
    {
        [Required] public string Email { get; set; }

        [Required] public string Password { get; set; }
    }

    public class LilAUth
    {
        public string Email { get; set; }
    }

    public class User
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        [JsonIgnore] public List<Employment> Employments { get; set; }

        [NotMapped]
        [JsonProperty("Employments")]
        public List<Team> Teams => Employments?.Select(x => x.Team).ToList();

        [JsonIgnore] public List<BoardMember> BoardMemberships { get; set; }

        [NotMapped]
        [JsonProperty("BoardMemberships")]
        public List<Board> Boards => BoardMemberships?.Select(x => x.Board).ToList();

        [JsonIgnore] public List<Assignment> Assignments { get; set; }

        [NotMapped]
        [JsonProperty("Assignments")]
        public List<Job> Users => Assignments?.Select(x => x.Job).ToList();

        // Many teams to one user
        public List<Team> Ownerships { get; set; }
    }

    public class MinimalUserViewModel
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }

    public class SuperMinimalUserViewModel
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
    }

    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }

        public List<MinimalTeamViewModel> Employments { get; set; }
        public List<MinimalBoardViewModel> BoardMemberships { get; set; }
        public List<MinimalJobViewModel> Assignments { get; set; }
    }
}