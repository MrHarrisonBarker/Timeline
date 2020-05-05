using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timeline
{
    public interface IOnlineUsers
    {
        IList<OnlineUser> GetAll();
        IList<OnlineUser> AddUser(OnlineUser user);
        IList<OnlineUser> RemoveConnection(string connectionId);
        IList<OnlineUser> RemoveUser(OnlineUser user);
    }

    public class OnlineUser
    {
        public Guid UserId { get; set; }
        public string ConnectionId { get; set; }
    }

    public class OnlineUsers : IOnlineUsers

    {
        public IList<OnlineUser> Users { get; set; } = new List<OnlineUser>();

        // private readonly IOnlineUsers _userRepository;
        //
        // public OnlineUsers(IOnlineUsers userRepository)
        // {
        //     _userRepository = userRepository;
        // }

        public IList<OnlineUser> GetAll()
        {
            return Users;
        }

        public IList<OnlineUser> AddUser(OnlineUser user)
        {
            if (Users.FirstOrDefault(x => x.UserId == user.UserId) == null)
            {
                var newUser = new OnlineUser
                {
                    ConnectionId = user.ConnectionId,
                    UserId = user.UserId
                };
                Users.Add(newUser);
            }
            return Users;
        }

        public IList<OnlineUser> RemoveConnection(string connectionId)
        {
            Users.Remove(Users.FirstOrDefault(x => x.ConnectionId == connectionId));
            return Users;
        }

        public IList<OnlineUser> RemoveUser(OnlineUser user)
        {
            Users.Remove(user);
            return Users;
        }
    }
}