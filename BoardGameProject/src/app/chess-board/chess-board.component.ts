import { Component, Input, OnChanges } from '@angular/core';
import { Board } from '../models/board';
import { Piece } from '../models/piece';
import { Space } from '../models/space';
import { GameService } from '../services/game/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {
  @Input()
  public gameReady: boolean = false;

  public board: Board;
  private subscription: Subscription;

  public spaces: Space[][];

  constructor(private gameService: GameService) { 
    this.subscription = new Subscription();
  }

  public ngOnInit() {
    this.subscription = this.gameService.chessSubject.subscribe((chess) => this.setBoard(chess?.board));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public showPossibleMoves(space: Space) {
    if (this.gameService.canMove) {
      this.spaces.forEach((row) => row.forEach((space) => space.possibleMove = false));
      
      if (this.getSelectedPiece() !== space.piece) {
        this.gameService.getPossibleMoves(space.piece.pieceID).subscribe((possibleMoves) => {
          if (!possibleMoves) { return; }
          possibleMoves.forEach((move) => this.spaces[8 - move.y][move.x - 1].possibleMove = true);
          space.piece.selected = true;
        });
      } else {
        this.getSelectedPiece().selected = false;
      }
    }

  }

  public movePiece(space: Space) {
    let selectedPiece: Piece = this.getSelectedPiece();
    this.gameService.movePiece(selectedPiece.pieceID, space.x, space.y);
  }

  private getSelectedPiece(): Piece {
    for (let row of this.spaces) {
      for (let column of row) {
        if (column.piece?.selected) {
          return column.piece;
        }
      }
    }
    return null;
  }

  private setBoard(board: Board) {
    this.spaces = [[], [], [], [], [], [], [], []];
    this.board = board;
    this.board.spaces?.forEach((space) => this.spaces[space.y - 1].push(space));
    this.spaces.forEach((column) => column.sort((a, b) => a.x - b.x));
    this.spaces.sort((a, b) => b[0].y - a[0].y);
  }
}
