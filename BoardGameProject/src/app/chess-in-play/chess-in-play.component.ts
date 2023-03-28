import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameSetupService } from '../services/game/game-setup.service';

@Component({
  selector: 'app-chess-in-play',
  templateUrl: './chess-in-play.component.html',
  styleUrls: ['./chess-in-play.component.css']
})
export class ChessInPlayComponent {

  public link: string = "https://tinyurl.com/example-link";

  public player1: string = "...";
  public player2: string = "...";

  public ready: boolean = false;

  public textHistory: string[] = [];

  public currentTurn: string = "";

  constructor(
    public gameSetupService: GameSetupService,
    public router: Router
  ) { }

  ngOnInit() {
    [this.player1, this.player2] = this.gameSetupService.getPlayers()

    this.gameSetupService.emitMockGameData().subscribe((text) => {
      if (text === "exampleUser starts") {
        this.currentTurn = "Player 1";
      }
      this.textHistory.push(text)
    });
  }

  public pauseMatch() {
    this.router.navigate(['my-games']);
  }

  public endTurn() {
    this.currentTurn = this.currentTurn === "Player 1" ? "Player 2" : "Player 1";
    if (this.currentTurn === "Player 1") {
      this.textHistory.push(this.player1 + "'s turn");
    } else {
      this.textHistory.push(this.player2 + "'s turn");
    }
    this.textHistory.push("...");
  }

  public forfit() {
    this.router.navigate(['my-stats']);
  }
}
