import { Component } from '@angular/core';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {

  public spaces: Space[][] = [];

  ngOnInit() {
    let id = 0;
    for (let i = 1; i < 9; i++) {
      this.spaces.push([]);
      for (let j = 1; j < 9; j++) {
        id++;
        this.spaces[i - 1].push(new Space(id, j, i));
      }
    }
  }

}

export class Space {
  public spaceID: number;
  public x: number;
  public y: number;
  public piece?: Piece;

  constructor( spaceID: number, x: number, y: number, piece?: Piece) {
    this.spaceID = spaceID;
    this.x = x;
    this.y = y;
    this.piece = piece; 
  }
}

export interface Piece {
  pieceID: number;
  type: Type;
  color: Color;
  hasMoved: boolean;
  space: Space;
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
