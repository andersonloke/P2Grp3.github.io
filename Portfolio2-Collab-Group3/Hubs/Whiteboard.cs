using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio2_Collab_Group3.Hubs
{
    public class Whiteboard:Hub
    {
        //public async Task SendMessage(string user, string message)
        //{
        //    await Clients.All.SendAsync("ReceiveMessage", user, message);
        //}

        public async Task SendPosition(string meetingCode,string div, int pos1, int pos2)
        {
            await Clients.Group(meetingCode).SendAsync("ReceiveNewPosition", div, pos1, pos2);
        }

        public async Task SendMessage(string meetingCode, string user, string message)
        {
            await Clients.Group(meetingCode).SendAsync("ReceiveMessage", user, message);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }
    }
}
