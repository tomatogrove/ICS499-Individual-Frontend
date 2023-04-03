import { Chess } from "./chess";
import { Piece } from "./piece";
import { Space } from "./space";

export class Board {
    public boardID?: number;
    public spaces?: Space[];
    public pieces?: Piece[];
    public chess?: Chess;


    constructor(boardID?: number, spaces?: Space[], pieces?: Piece[], chess?: Chess) {
        this.boardID = boardID;
        this.spaces = spaces;
        this.pieces = pieces;
        this.chess = chess;
    }
}