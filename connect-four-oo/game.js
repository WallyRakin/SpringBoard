class Game {
    constructor(boardElement, player1, player2, height = 6, width = 7) {
        this.boardElement = boardElement;
        this.board = [];
        this.height = height;
        this.width = width;
        this.currPlayer = player1;
        this.player1 = player1;
        this.player2 = player2
        this.makeBoard();
        this.gameOver = false;
    };

    makeBoard() {
        for (let y = 0; y < this.height; y++) {
            this.board.push(Array.from({ length: this.width }));
        }
    };

    switchPlayer() {
        if (this.currPlayer.number == this.player1.number) {
            this.currPlayer = this.player2
        }
        else if (this.currPlayer.number == this.player2.number) {
            this.currPlayer = this.player1
        };
    };

};