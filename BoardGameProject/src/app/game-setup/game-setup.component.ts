import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameSetupService } from '../services/game/game-setup.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent {

    public link: string = "https://tinyurl.com/example-link";

    public player1: string = "...";
    public player2: string = "...";

    public ready: boolean = false;

    public textHistory: string[] = [];

    constructor(
      public gameSetupService: GameSetupService,
      public router: Router
    ) { }

    ngOnInit() {
      this.textHistory.push("Room Opened...", "...");
      this.gameSetupService.emitMockSetupData().subscribe((text) => {
        if (text.includes("Player 1")) {
          this.player1 = "exampleUser";
        } else if (text.includes("Player 2")) {
          this.player2 = "guest123";
        } else if (text === "Game is ready to start!") {
          this.ready = true;
        }
        this.textHistory.push(text);
      });
    }

    public cancel() {
      this.router.navigate(['home']);
    }

    public startGame() {
      if (this.ready) {
        this.router.navigate(['game-in-play']);
      }
    }
}
