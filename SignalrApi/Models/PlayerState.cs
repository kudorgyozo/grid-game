namespace SignalrApi.Models {

    public class PlayerState {
        public string PlayerName { get; set; }

        public string OpponentName { get; set; }

        public byte[,] Board { get; set; } = new byte[10, 10];

        public byte[,] OpponentBoard { get; set; } = new byte[10, 10];

        public GamePhase GamePhase { get; set; }

        public bool PlayersTurn { get; set; }

        public List<GamePiece> Pieces { get; set; }
    }

    public record GamePiece {

        public static GamePiece Piece1 = new GamePiece() {
            Id = 1,
            Cols = 3,
            Rows = 2,
            Data = new byte[,] {
                { 0, 1, 0 },
                { 1, 1, 1 }
            }
        };

        public static GamePiece Piece2 = new GamePiece() {
            Id = 2,
            Cols = 1,
            Rows = 4,
            Data = new byte[,] {
                { 1 },
                { 1 },
                { 1 },
                { 1 },
            }
        };

        public int Id { get; set; }

        public int Rows { get; set; }
        public int Cols { get; set; }

        public byte[,] Data { get; set; }
    }

    public enum GamePhase {
        Setup = 0,
        Game = 1,
        Over = 2

    }
}
