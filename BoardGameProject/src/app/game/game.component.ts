import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game/game.service';
import { Chess } from '../models/chess';
import { Subscription, map, take } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  public link: string = window.location.href;
  
  private subscription: Subscription;

  public player1: string = "...";
  public player2: string = "...";

  public textHistory: string[] = [];

  public loading: boolean = false;
  public gameReady: boolean = false;

  public chess: Chess;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { 
    this.subscription = new Subscription();
  }

  public ngOnInit() {
    this.gameService.ngOnInit();
    this.gameService.link$.pipe(take(1)).subscribe(((link) => this.link = link));

    this.textHistory.push("Room Opened...", "...");
    this.gameService.emitMockSetupData().subscribe((text) => {
      if (text.includes("Player 1")) {
        this.player1 = "exampleUser";
      } else if (text.includes("Player 2")) {
        this.player2 = "guest123";
      } else if (text === "Game is ready to start!") {
      }
      this.textHistory.push(text);
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public cancel() {
    this.router.navigate(['home']);
  }

  public pauseMatch() {
    this.router.navigate(['my-games']);
  }
  
  public forfit() {
    this.router.navigate(['my-stats']);
  }

  public copyButton(): void {
    navigator.clipboard.writeText(this.link);
  }
}
