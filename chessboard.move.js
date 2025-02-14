import Piece from "./chessboard.piece.js";
import Square from "./chessboard.square.js";

class Move {

    constructor(from, to, promotion = null) {
        this.piece = from.getPiece();
        this.from = from;
        this.to = to;
        this.promotion = promotion;

        this.check();
    }

    hasPromotion() {
        return this.promotion !== null;
    }

    setPromotion(promotion) {
        this.promotion = promotion;
    }

    check() {
        if (this.piece === null) {
            throw new Error('Move: no piece to move');
        } else if (['q', 'r', 'b', 'n', null].indexOf(this.promotion) === -1) {
            throw new Error('Move: invalid promotion');
        } 

        if (!(this.from instanceof Square) || !(this.to instanceof Square)) {
            throw new Error('Move: from and to must be Square objects');
        }

        if (!(this.piece instanceof Piece)) {
            throw new Error('Move: piece must be a Piece object');
        }
    }

    isLegal(game) {
        let destinations = game.moves({square: this.from.id, verbose: true}).map(move => move.to);
        return destinations.indexOf(this.to.id) !== -1;
    }


}

export default Move;