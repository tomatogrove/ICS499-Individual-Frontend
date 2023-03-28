import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {

  @Input()
  public realGame: boolean = false;

  public spaces: Space[][] = [];

  ngOnInit() {
    let id = 0;
    for (let i = 1; i < 9; i++) {
      this.spaces.push([]);
      for (let j = 1; j < 9; j++) {
        id++;
        if (this.realGame && (i === 1 || i === 2 || i ===7|| i === 8)) {
          let space: Space = new Space(id, j, i);
          let piece: Piece = Piece.createPiece(j, i, space);
          this.spaces[i - 1].push(new Space(id, j, i, piece));
        } else {
          this.spaces[i - 1].push(new Space(id, j, i));
        }
      }
    }
  }

}

export class Space {
  public spaceID: number;
  public x: number;
  public y: number;
  public piece?: Piece;

  constructor(spaceID: number, x: number, y: number, piece?: Piece) {
    this.spaceID = spaceID;
    this.x = x;
    this.y = y;
    this.piece = piece; 
  }
}

export class Piece {
  pieceID: number;
  type: Type;
  color: Color;
  hasMoved: boolean;
  space: Space;
  
  constructor(pieceID: number, type: Type, color: Color, hasMoved: boolean, space: Space) {
    this.pieceID = pieceID;
    this.type = type;
    this.color = color;
    this.hasMoved = hasMoved; 
    this.space = space; 
  }

  static createPiece(x: number, y: number, space: any): any {
    
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
