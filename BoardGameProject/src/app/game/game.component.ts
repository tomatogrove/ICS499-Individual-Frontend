import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game/game.service';
import * as io from 'socket.io-client';
import { SignInService } from '../services/sign-in/sign-in.service';
import { Chess } from '../models/chess';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  public link: string = "";

  public player1: string = "...";
  public player2: string = "...";

  public textHistory: string[] = [];

  public loading: boolean = false;
  public gameReady: boolean = false;

  public chess: Chess;

  private socket: any; // socket.io Socket
  private chessID: number;

  constructor(
    private gameSetupService: GameService,
    private signInService: SignInService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.link = window.location.href;
    this.chessID = +this.route.snapshot.paramMap.get("chessID") || -1;

    this.socket = io("http://localhost:8085");

    this.socket.on("connect", () => {
        console.log("Connected to server");

        let sessionID: string = this.signInService.getSessionFromCookie() || "-1";
        this.socket.emit("joinGame", `${sessionID},${this.chessID}`);
    });

    this.socket.on('connect_error', (error) => {
      this.socket.disconnect();
      this.router.navigate(["/home"]);
    });

    this.socket.on("onJoinGame", response => {
      this.chess = response;
      this.link += this.chessID === -1 ? `/${response.chessID}` : "";
    });

    this.socket.on("onError", response => {
      window.alert(response);
      this.router.navigate(["/home"]);
    });

    this.socket.on("onGameReady", () => this.gameReady = true);

    this.textHistory.push("Room Opened...", "...");
    this.gameSetupService.emitMockSetupData().subscribe((text) => {
      if (text.includes("Player 1")) {
        this.player1 = "exampleUser";
      } else if (text.includes("Player 2")) {
        this.player2 = "guest123";
      } else if (text === "Game is ready to start!") {
      }
      this.textHistory.push(text);
    });
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
