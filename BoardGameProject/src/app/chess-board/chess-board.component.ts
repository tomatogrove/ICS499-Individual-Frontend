import { Component, Input } from '@angular/core';
import { Piece } from '../models/piece';
import { Space } from '../models/space';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {

  @Input()
  public realGame: boolean = false;

  public spaces: Space[][] = [];

  public possibleMoves: Space[] = [];

  ngOnInit() {
    let id = 0;

    for (let i = 0; i < 8; i++) {
      this.spaces.push([]);
    }

    for (let i = 8; i > 0; i--) {
      for (let j = 1; j < 9; j++) {
        id++;
        if (this.realGame && (i === 1 || i === 2 || i ===7 || i === 8)) {
          let space: Space = new Space(id, j, i, this);
          let piece: Piece = Piece.createPiece(j, i, space, this);
          this.spaces[8 - i].push(new Space(id, j, i, this, piece));
        } else {
          this.spaces[8 - i].push(new Space(id, j, i, this));
        }
      }
    }
  }

  public showPossibleMoves(space: Space) {
    if (space.piece) {
      space.piece.isSelected = !space.piece?.isSelected;
      if (space.piece.isSelected) {
        this.possibleMoves = space.piece.getPossibleMoves();
      } else {
        this.possibleMoves.forEach((space) => space.possibleMove = false)
        this.possibleMoves = [];
      }
    }
  }

  public getSpace(x: number, y: number): Space | undefined {
    let space: Space | undefined = undefined;

    space = this.spaces[y - 1].find((space) => space.x === x);

    return space;
  }
}
