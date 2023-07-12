namespace SignalrApi.Models {
    public class GameState {
        public List<Session> Sessions { get; set; }

        public GameState() {
            Sessions = new List<Session>(10);
        }

        internal PlayerState AddPlayer(string name, string connectionId) {
            var session = FindSessionForPlayer(name, connectionId);
            var playerState = CreatePlayerStateFromSession(session);
            return playerState;
        }

        private PlayerState CreatePlayerStateFromSession(Session session) {
            return null;
        }

        private Session FindSessionForPlayer(string name, string connectionId) {
            return null;
        }

        internal void RemovePlayer(string connectionId) {
            //TODO:
        }
    }

    public class Session {
        public Session() {
        }

        public List<Player> Players { get; set; } = new List<Player>(2);

        public GamePhase GamePhase { get; set; } = GamePhase.Setup;

        public Player CurrentPlayer { get; set; }
    }

    public class Player {
        public Player() {
        }

        public string Name { get; set; }

        public string ConnectionId { get; set; }

        public bool Connected => ConnectionId != null;

        public byte[,] Board { get; set; }
    }
}
