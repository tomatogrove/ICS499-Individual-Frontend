import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as io from 'socket.io-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInService } from '../services/sign-in/sign-in.service';
import { Chess } from '../models/chess';
import { SignInModalComponent } from '../modals/sign-in-modal/sign-in-modal.component';
import { Subscription } from 'rxjs';
import { ForfeitGameModalComponent } from '../modals/forfeit-game-modal/forfeit-game-modal.component';
import { AlertModalComponent } from '../modals/server-alert-modal/alert-modal.component';
import { PauseGameModalComponent } from '../modals/pause-game-modal/pause-game-modal.component';
import { CancelGameModalComponent } from '../modals/cancel-game-modal/cancel-game-modal.component';
import { Space } from '../models/space';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @ViewChild("textBox")
  public textBoxElement: ElementRef<HTMLDivElement>;

  public link: string = "";
  
  private subscriptions: Subscription[];

  public textHistory: string[] = [];

  public loading: boolean = false;
  public gameReady: boolean = false;
  public hasLeft: boolean = false;

  public canMove: boolean = false; 
  public canMoveColor: string = "";

  public chess: Chess;

  public socket: any; // socket.io Socket
  private chessID: number;
  public playerColor: string;

  private boardLetters: string = "abcdefgh";

  constructor(
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

    this.textHistory.push("Room Opened...");
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    if (!this.hasLeft) {
      this.socket.emit("leaveGame", `${this.chessID}`);
      this.socket.disconnect();
    }
  }

  public copyButton(): void {
    navigator.clipboard.writeText(this.link);
    window.alert("copied link");
  }

  private setUpSocketEvents(): void {
    this.socket.on("connect", () => {
        let sessionID: string = this.signInService.getSessionFromCookie() || "-1";
        if (!this.signInService.signedIn && sessionID === "-1") {
          this.openSignInModal(sessionID);
        } else {
          this.socket.emit("joinGame", `${sessionID},${this.chessID}`);
        }
    });

    this.socket.on('connect_error', (error) => {
      this.router.navigate(["/home"]);
    });

    this.socket.on("onJoinGame", response => {
      this.chess = response;
      this.link += this.chessID === -1 ? `/${response.chessID}` : "";
      this.chessID = response.chessID;
      if (this.signInService.session.userAccount.userAccountID === this.chess.whitePlayerID) {
        this.playerColor = "WHITE";
      } else {
        this.playerColor = "BLACK";
      }
    });

    this.socket.on("onError", response => {
      if (response === "Session not found") {
        this.openSignInModal("-1");
      } else {
        const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
        modalRef.componentInstance.title = "Server Error";
        modalRef.componentInstance.text = response;
        this.subscriptions.push(modalRef.closed.subscribe(() => {
          this.router.navigate(["/home"]);
        }));
      }
    });

    this.socket.on("onGameReady", (response) => {
      history.replaceState(null, "", `http://localhost:4200/game/${response.chessID}`)
      this.chess = response;
      this.gameReady = true;

      this.canMoveColor = this.chess.currentTurn === "WHITE" ? "WHITE" : "BLACK";
      this.canMove = this.canMoveColor === this.playerColor;
      
      this.sendToChat(this.chess.whitePlayer.username + " has joined as the White Player");
      this.sendToChat(this.chess.blackPlayer.username + " has joined as the Black Player");
      this.sendToChat("The game is ready to play!");
    });

    this.socket.on("onNextTurnWhite", response => {
      this.sendToChat(this.formatMoveForChat(this.findMovedPiece(response)));
      this.chess = response;
      this.canMoveColor = this.chess.currentTurn === "WHITE" ? "WHITE" : "BLACK";
      this.canMove = this.canMoveColor === this.playerColor;
    }); 

    this.socket.on("onNextTurnBlack", response => {
      this.sendToChat(this.formatMoveForChat(this.findMovedPiece(response)));
      this.chess = response;
      this.canMoveColor = this.chess.currentTurn === "WHITE" ? "WHITE" : "BLACK";
      this.canMove = this.canMoveColor === this.playerColor;
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
        text = user.username !== response ? `Congratulations ${user.username}, you have won the match!` : `${response} has won the match`;
        text += "\nYou will be brought to your stats"

      }
      const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.text = text;
      this.subscriptions.push(modalRef.closed.subscribe(() => {
        this.hasLeft = true;
        this.socket.disconnect();
        this.router.navigate(["my-stats"]);
      }));
      
    })

    this.socket.on("onLeaveGame", () => {
      this.canMove = false;
      const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
      modalRef.componentInstance.title = "Game Interrupted";
      modalRef.componentInstance.text = 
        "Your opponent has left the game.\nThe game has been saved and you will be sent to the home screen.\nHave everyone rejoin to continue the game.";
      this.subscriptions.push(modalRef.closed.subscribe(() => {
        this.router.navigate(["/home"]);
      }));
    })
  }

  public cancel() {
    const modalRef = this.modalService.open(CancelGameModalComponent, { centered: true });
    this.subscriptions.push(modalRef.closed.subscribe((cancel?: boolean) => {
      if (cancel) {
        this.router.navigate(['home']);
      }
    }));
  }

  public pauseMatch() {
    const modalRef = this.modalService.open(PauseGameModalComponent, { centered: true });
    this.subscriptions.push(modalRef.closed.subscribe((leave?: boolean) => {
      if (leave) {
        this.router.navigate(['my-games']);
      }
    }));
  }
  
  public forfeit() {
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

  public formatMoveForChat(space): string {
    let pieceColor = space.piece.color.toLowerCase();
    let pieceType = space.piece.type.toLowerCase();
    let xLetter = this.boardLetters[space.x - 1];
    return pieceColor + " " + pieceType + " to " + xLetter + space.y;
  }

  private sendToChat(chat: string) {
    this.textHistory.push(chat);
    setTimeout(() => {
      this.textBoxElement.nativeElement.scrollTop = this.textBoxElement.nativeElement.scrollHeight;
    }, 0);
    
  }

  private findMovedPiece(game: Chess): Space {
    let origList = this.chess.board.spaces.filter((s) => !s.occupied);
    let respList = game.board.spaces.filter((s) => s.occupied);
    let result = respList.filter((x) => origList.some(y => {
        return x.spaceID === y.spaceID;
      }
    ));

    if(!result[0]){
      origList = this.chess.board.spaces.filter((s) => s.occupied && s.piece.color !== this.canMoveColor);
      respList = game.board.spaces.filter((s) => s.occupied && s.piece.color === this.canMoveColor);
      result = respList.filter((x) => origList.some(y => {
          return x.spaceID === y.spaceID && x.piece.color !== y.piece.color;
        }
      ));
    }

    return result[0] || null;
  }
}
