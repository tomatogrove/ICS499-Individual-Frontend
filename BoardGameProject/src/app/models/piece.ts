import { Board } from "./board";
import { Space } from "./space";

export class Piece {
    pieceID?: number;
    type: string;
    color: string;
    hasMoved: boolean;
    space: Space;
    board: Board;
    selected: boolean;
    
    constructor(type: string, color: string, hasMoved: boolean, space: Space, board: Board, pieceID?: number) {
      this.pieceID = pieceID;
      this.type = type;
      this.color = color;
      this.hasMoved = hasMoved; 
      this.space = space; 
      this.board = board;
      this.selected = false;
    }
  
    static createPiece(x: number, y: number, space: Space, board: Board): Piece {
      let color: string = y > 2 ? 'BLACK' : 'WHITE';
      let piece: Piece;
      if (y === 2 || y === 7) {
        piece = new Piece('PAWN', color, false, space, board);
      } else {
        if (x == 1 || x == 8) {
          piece = new Piece('ROOK', color, false, space, board);
        } else if (x == 2 || x == 7) {
          piece = new Piece('KNIGHT', color, false, space, board);
        } else if (x == 3 || x == 6) {
          piece = new Piece('BISHOP', color, false, space, board);
        } else if (x === 4) {
          piece = new Piece('QUEEN', color, false, space, board);
        } else {
          piece = new Piece('KING', color, false, space, board);
        }
      }
  
      return piece;
    }
    
  }