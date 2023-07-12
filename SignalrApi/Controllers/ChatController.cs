using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;


namespace SignalrApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase {
        private readonly IHubContext<ChatHub> chatHub;

        public ChatController(IHubContext<ChatHub> hub) {
            chatHub = hub;
        }

        [HttpPost]
        public async Task Post() {
            await chatHub.Clients.All.SendAsync(ChatHub.ReceiveMessage,"", "");
        }

        [HttpGet]
        public string[] Get() {
            return new string[] { "" };
        }
    }
}
