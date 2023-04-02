import { ChessBoardComponent } from "../chess-board/chess-board.component";
import { Space } from "./space";

export class Piece {
    pieceID?: number;
    type: Type;
    color: Color;
    hasMoved: boolean;
    space: Space;
    board: ChessBoardComponent;
    isSelected: boolean;
    
    constructor(type: Type, color: Color, hasMoved: boolean, space: Space, board: ChessBoardComponent, pieceID?: number) {
      this.pieceID = pieceID;
      this.type = type;
      this.color = color;
      this.hasMoved = hasMoved; 
      this.space = space; 
      this.board = board;
      this.isSelected = false;
    }
  
    static createPiece(x: number, y: number, space: Space, board: ChessBoardComponent): Piece {
      let color: Color = y > 2 ? Color.BLACK : Color.WHITE;
      let piece: Piece;
      if (y === 2 || y === 7) {
        piece = new Piece(Type.PAWN, color, false, space, board);
      } else {
        if (x == 1 || x == 8) {
          piece = new Piece(Type.ROOK, color, false, space, board);
        } else if (x == 2 || x == 7) {
          piece = new Piece(Type.KNIGHT, color, false, space, board);
        } else if (x == 3 || x == 6) {
          piece = new Piece(Type.BISHOP, color, false, space, board);
        } else if (x === 4) {
          piece = new Piece(Type.QUEEN, color, false, space, board);
        } else {
          piece = new Piece(Type.KING, color, false, space, board);
        }
      }
  
      return piece;
    }
  
    public getColorName(): string {
      return Color[this.color];
    }
  
    public getTypeName(): string {
      return Type[this.type];
    }
  
    getPossibleMoves(): Space[] {
      let possibleMoves: Space[] = [];
      if (this.type === Type.PAWN) {
        possibleMoves = this.getPawnMoves();
      } else if (this.type === Type.KNIGHT) {
        possibleMoves = this.getKnightMoves();
      } else if (this.type === Type.BISHOP) {
        possibleMoves = this.getDiagonalMoves();
      } else if (this.type === Type.QUEEN) {
        possibleMoves = this.getStraightMoves();
        possibleMoves.concat(this.getDiagonalMoves());
      } else if (this.type === Type.KING) {
        possibleMoves = this.getKingMoves();
      } else {
        possibleMoves = this.getStraightMoves();
      }
      return possibleMoves;
    }
  
    getPawnMoves(): Space[] {
        let possibleMove: Space[] = [];

        let x = this.space.x;
        let y = this.space.y;

        return possibleMove;
    }
  
    getKnightMoves(): Space[] {
        let possibleMove: Space[] = [];

        return possibleMove;
    }
    
    getStraightMoves(): Space[] {
        let possibleMove: Space[] = [];

        return possibleMove;
    }
  
    getDiagonalMoves(): Space[] {
        let possibleMove: Space[] = [];

        return possibleMove;
    }
  
    getKingMoves(): Space[] {
        let possibleMove: Space[] = [];

        return possibleMove;
    }
    
  }
  
  export enum Type {
    PAWN,
    BISHOP,
    ROOK,
    KNIGHT,
    KING,
    QUEEN
  }

  
export enum Color {
    BLACK,
    WHITE
  }