using Microsoft.AspNetCore.SignalR;
using SignalrApi.Models;

public class GameHub : Hub {
    private readonly GameState gameState;

    public GameHub(GameState gameState) {
        this.gameState = gameState;
    }

    public PlayerState AddPlayer(string name) {
        var state = gameState.AddPlayer(name, Context.ConnectionId);
        return state;
    }

    public override Task OnConnectedAsync() {
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception) {
        gameState.RemovePlayer(Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }
}