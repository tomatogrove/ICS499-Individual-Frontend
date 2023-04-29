import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game/game.service';
import * as io from 'socket.io-client';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInService } from '../services/sign-in/sign-in.service';
import { Chess } from '../models/chess';
import { SignInModalComponent } from '../modals/sign-in-modal/sign-in-modal.component';
import { Subscription } from 'rxjs';
import { ForfeitGameModalComponent } from '../modals/forfeit-game-modal/forfeit-game-modal.component';
import { AlertModalComponent } from '../modals/server-alert-modal/alert-modal.component';
import { PauseGameModalComponent } from '../modals/pause-game-modal/pause-game-modal.component';
import { CancelGameModalComponent } from '../modals/cancel-game-modal/cancel-game-modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  public link: string = "";
  
  private subscriptions: Subscription[];

  public player1: string = "...";
  public player2: string = "...";

  public textHistory: string[] = [];

  public loading: boolean = false;
  public gameReady: boolean = false;
  public hasLeft: boolean = false;

  public canMove: boolean = false; 

  public chess: Chess;

  public socket: any; // socket.io Socket
  private chessID: number;
  public playerColor: string;

  constructor(
    private gameSetupService: GameService,
    private signInService: SignInService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { 
    this.subscriptions = [];
  }

  public ngOnInit() {
    this.link = window.location.href;
    this.chessID = +this.route.snapshot.paramMap.get("chessID") || -1;

    this.socket = io("http://localhost:8085");
    this.setUpSocketEvents();

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

  public ngOnDestroy() {
    console.log("onDestroy");
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    if (!this.hasLeft) {
      let sessionID = this.signInService.getSessionFromCookie()
      this.socket.emit("leaveGame", `${sessionID},${this.chessID}`);
      this.socket.disconnect();
    }
  }

  public copyButton(): void {
    navigator.clipboard.writeText(this.link);
    window.alert("copied link");
  }

  private setUpSocketEvents(): void {
    this.socket.on("connect", () => {
        console.log("Connected to server");

        let sessionID: string = this.signInService.getSessionFromCookie() || "-1";
        if (!this.signInService.signedIn && sessionID === "-1") {
          this.openSignInModal(sessionID);
        } else {
          this.socket.emit("joinGame", `${sessionID},${this.chessID}`);
        }
    });

    this.socket.on('connect_error', (error) => {
      this.socket.disconnect();
      this.router.navigate(["/home"]);
    });

    this.socket.on("onJoinGame", response => {
      this.chess = response;
      this.link += this.chessID === -1 ? `/${response.chessID}` : "";
      this.chessID = response.chessID;
      console.log(this.chess);
      if (this.signInService.session.userAccount.userAccountID === this.chess.whitePlayer.userAccountID) {
        this.playerColor = "WHITE";
      } else {
        this.playerColor = "BLACK";
      }
    });

    this.socket.on("onError", response => {
      if (response === "Session not found") {
        this.openSignInModal("-1");
      } else {
        let sessionID = this.signInService.getSessionFromCookie();
        const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
        modalRef.componentInstance.title = "Server Error";
        modalRef.componentInstance.text = response;
        this.subscriptions.push(modalRef.closed.subscribe(() => {
          this.socket.disconnect();
          this.socket.emit("leaveGame", `${sessionID},${this.chessID}`);
          this.router.navigate(["/home"]);
        }));
      }
    });

    this.socket.on("onGameReady", () => {
      this.gameReady = true;
      if (this.signInService.session.userAccount.userAccountID === this.chess.whitePlayer.userAccountID) {
        this.canMove = true;
      }
    });

    this.socket.on("onNextTurnWhite", response => {
      this.chess = response;
      if (this.signInService.session.userAccount.userAccountID === this.chess.whitePlayer.userAccountID) {
        this.canMove = true;
      } else {
        this.canMove = false;
      }
    }); 

    this.socket.on("onNextTurnBlack", response => {
      this.chess = response;
      if (this.signInService.session.userAccount.userAccountID === this.chess.blackPlayer.userAccountID) {
        this.canMove = true;
      } else {
        this.canMove = false;
      }
    });

    this.socket.on("onGameEnd", (response: string) => {
      let title = "";
      let text = "";
      if (response === "This game is already over") {
        title = "Game Ended";
        text = response;
      } else {
        this.canMove = false;
        let user = this.signInService.session.userAccount;

        title = user.username !== response ? "Congratulations" : "Game Ended";
        text = user.username !== response ? `Congratulations ${response} you have won the match!` : `${response} has won the match`;
        text += "\nYou will be brought to your stats"

      }
      const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.text = text;
      this.subscriptions.push(modalRef.closed.subscribe(() => {
        this.hasLeft = true;
        this.socket.disconnect();
        this.router.navigate(["/home"]);
      }));
      
    })

    this.socket.on("onLeaveGame", (userID) => {
      console.log("close room");
      this.canMove = false;
      this.hasLeft = true;
      if (userID !== this.signInService.session.userAccount.userAccountID) {
        const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
        modalRef.componentInstance.title = "Game Interrupted";
        modalRef.componentInstance.text = 
          "Your opponent has left the game.\nThe game has been saved and you will be sent to the home screen.\nHave everyone rejoin to continue the game.";
        this.subscriptions.push(modalRef.closed.subscribe(() => {
          this.socket.disconnect();
          this.router.navigate(["/home"]);
        }));
      }
    })
  }

  public cancel() {
    const modalRef = this.modalService.open(CancelGameModalComponent, { centered: true });
    this.subscriptions.push(modalRef.closed.subscribe((cancel?: boolean) => {
      if (cancel) {
        this.hasLeft = true;
        this.router.navigate(['home']);
        this.socket.disconnect();
      }
    }));
  }

  public pauseMatch() {
    console.log("pausing match");
    let sessionID = this.signInService.getSessionFromCookie();
    const modalRef = this.modalService.open(PauseGameModalComponent, { centered: true });
    this.subscriptions.push(modalRef.closed.subscribe((leave?: boolean) => {
      if (leave) {
        this.hasLeft = true;
        this.socket.emit("leaveGame", `${sessionID},${this.chessID}`);
        this.socket.disconnect();
        this.router.navigate(['my-games']);
      }
    }));
  }
  
  public forfeit() {
    console.log("forfeiting match", this.chessID)
    let sessionID = this.signInService.getSessionFromCookie();
    const modalRef = this.modalService.open(ForfeitGameModalComponent, { centered: true });
    this.subscriptions.push(modalRef.closed.subscribe((forfeit?: boolean) => {
      if (forfeit) {
        this.hasLeft = true;
        this.socket.emit("forfeitGame", `${sessionID},${this.chessID}`);
        this.socket.disconnect();
        this.router.navigate(['my-stats']);
      }
    }));
  }

  private openSignInModal(sessionID: string): void {
    const modalRef = this.modalService.open(SignInModalComponent, { centered: true });
    this.subscriptions.push(modalRef.closed.subscribe(() => {
      sessionID = this.signInService.getSessionFromCookie() || "-1";
      if (sessionID !== "-1") {
        this.socket.emit("joinGame", `${sessionID},${this.chessID}`);
      } else {
        this.hasLeft = true;
        this.router.navigate(["/home"]);
      }
    }));
  }
}
