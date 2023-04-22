import { Component, Input, OnChanges } from '@angular/core';
import { Board } from '../models/board';
import { Piece } from '../models/piece';
import { Space } from '../models/space';
import { GameInPlayService } from '../services/game/game-in-play.service';
import { SignInService } from '../services/sign-in/sign-in.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnChanges {
  @Input()
  public gameReady: boolean = false;
  @Input()
  public board: Board;
  @Input()
  public socket: any;
  @Input()
  public canMove: boolean = false; 

  public spaces: Space[][];

  constructor(
    private gameInPlayService: GameInPlayService,
    private signInService: SignInService
    ) {}

  public ngOnChanges(): void {
    this.setBoard(this.board);
  }

  public showPossibleMoves(space: Space) {
    if (this.canMove) {
      this.spaces.forEach((row) => row.forEach((space) => space.possibleMove = false));
      
      if(this.getSelectedPiece() !== space.piece){
        this.gameInPlayService.getPossibleMoves(space.piece.pieceID).subscribe((possibleMoves) => {
          if(!possibleMoves) { return; }
          possibleMoves.forEach((move) => this.spaces[8 - move.y][move.x - 1].possibleMove = true);
          space.piece.selected = true;
        });
      }else{
        this.getSelectedPiece().selected = false;
      }
    }
  }

  public movePiece(space: Space) {
    if (this.canMove) {
      let selectedPiece: Piece = this.getSelectedPiece();
  
      let data: string = `${this.signInService.getSessionFromCookie()},${selectedPiece.pieceID},${space.x},${space.y}`;
  
      this.socket.emit("movePiece", data);
    }
  }

  private getSelectedPiece(): Piece {
    for (let row of this.spaces) {
      for (let column of row) {
        if(column.piece?.selected){
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
