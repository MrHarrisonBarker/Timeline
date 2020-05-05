using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Timeline.Hubs
{
    public class UserHub: Hub
    {

        private readonly IOnlineUsers _onlineUsers;

        public UserHub(IOnlineUsers onlineUsers)
        {
            _onlineUsers = onlineUsers;
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Client Connected {Context.ConnectionId}");
        }
        
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine($"Client Disconnceted {Context.ConnectionId}");
            await Clients.All.SendAsync("disconnect",_onlineUsers.RemoveConnection(Context.ConnectionId));
        }

        public async Task Add(Guid userId)
        {
            _onlineUsers.AddUser(new OnlineUser {ConnectionId = Context.ConnectionId,UserId = userId});
            await Clients.Others.SendAsync("new",_onlineUsers.GetAll());
        }
    }
}