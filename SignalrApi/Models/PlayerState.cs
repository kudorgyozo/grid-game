namespace SignalrApi.Models {
    public class PlayerState {
        public string PlayerName { get; set; }

        public string OpponentName { get; set; }

        public byte[,] Board { get; set; } = new byte[10, 10];

        public byte[,] OpponentBoard { get; set; } = new byte[10, 10];

        public GamePhase GamePhase { get; set; }

        public bool PlayersTurn { get; set; }

    }

    public enum GamePhase {
        Setup = 0,
        Game = 1,
        Over = 2

    }
}
