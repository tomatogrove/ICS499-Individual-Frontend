import { ChessBoardComponent } from "../chess-board/chess-board.component";
import { Piece } from "./piece";

export class Space {
    public spaceID: number;
    public x: number;
    public y: number;
    public board: ChessBoardComponent;
    public piece?: Piece;
    public possibleMove: boolean;
  
    constructor(spaceID: number, x: number, y: number, board: ChessBoardComponent, piece?: Piece) {
      this.spaceID = spaceID;
      this.x = x;
      this.y = y;
      this.board = board;
      this.piece = piece; 
      this.possibleMove = false;
    }
  
  }