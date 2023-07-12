using Microsoft.AspNetCore.SignalR;
using SignalrApi;

public class ChatHub : Hub {
    public static string ReceiveMessage = "ReceiveMessage";


    public ChatHub()
    {

    }


    public async Task SendMessage(string user, string message) {
        await Clients.All.SendAsync(ReceiveMessage, user, message);
    }
}