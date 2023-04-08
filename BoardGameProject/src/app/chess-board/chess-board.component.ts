import { Component, Input } from '@angular/core';
import { Board } from '../models/board';
import { Piece } from '../models/piece';
import { Space } from '../models/space';
import { GameInPlayService } from '../services/game/game-in-play.service';
import { GameSetupService } from '../services/game/game-setup.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {
  
  @Input()
  public realGame: boolean = false;

  public spaces: Space[][];
  public board: Board;

  public loading: boolean = true;

  constructor(
    private gameSetupService: GameSetupService,
    private gameInPlayService: GameInPlayService
    ) {}

  public ngOnInit() {
    this.gameSetupService.getBoardByID(1).subscribe((board: Board) => {
      this.setBoard(board);
      this.loading = false;
    }) 
  }

  public showPossibleMoves(space: Space) {
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

  public movePiece(space: Space) {
    let selectedPiece: Piece = this.getSelectedPiece();
    this.gameInPlayService.movePiece(selectedPiece.pieceID, space.x, space.y).subscribe(board => {
      this.setBoard(board);
    });
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
