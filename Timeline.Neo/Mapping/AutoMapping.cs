using System.Linq;
using AutoMapper;
using Timeline.Neo.Models;

namespace Timeline.Neo.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<User, MinimalUserViewModel>();
            CreateMap<Team, MinimalTeamViewModel>();
            CreateMap<Board, MinimalBoardViewModel>();
            CreateMap<Job, MinimalJobViewModel>();
            CreateMap<Board, SuperMinimalBoardViewModel>();
            CreateMap<Team, SuperMinimalTeamViewModel>();
            CreateMap<User, SuperMinimalUserViewModel>();
        }
    }
}