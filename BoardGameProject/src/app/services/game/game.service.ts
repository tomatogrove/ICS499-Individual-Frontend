import { Injectable } from '@angular/core';
import { concatMap, delay, from, Observable, of, Subject, Subscription } from 'rxjs';
import { Board } from 'src/app/models/board';
import { HttpClient} from "@angular/common/http";
import * as io from 'socket.io-client';
import { Chess } from 'src/app/models/chess';
import { SignInService } from '../sign-in/sign-in.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInModalComponent } from 'src/app/modals/sign-in-modal/sign-in-modal.component';
import { Space } from 'src/app/models/space';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = "http://localhost:8080/board";

  public tempSetupLog: string[] = [
    " joined the game as Player 1",
    "...",
    " joined the game as Player 2",
    "...",
    "Game is ready to start!"
  ];

  public tempGameLog: string[] = [
    "Game Opened for as Player 1 and  as Player 2",
    "...",
    " starts",
    "..."
  ]

  public players: string[] = [];

  public loading: boolean = false;
  public gameReady: boolean = false;

  private chess: Chess;
  public canMove: boolean = false;

  public chessSubject: Subject<Chess> = new Subject();
  public link$: Observable<string> = new Observable();

  private socket: any; // socket.io Socket
  private chessID: number;
  private sessionID: string;
  private subscription: Subscription;

  constructor(
    private http: HttpClient,
    private signInService: SignInService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { 
    this.subscription = new Subscription();
  }
  
  public ngOnInit() {
    this.chessID = +this.route.snapshot.paramMap.get("chessID") || -1;

    this.socket = io("http://localhost:8085");

    this.socket.on("connect", () => {
      console.log("Connected to server");

      this.sessionID = this.signInService.getSessionFromCookie() || "-1";
      if (!this.signInService.signedIn && this.sessionID === "-1") {
        
        const modalRef = this.modalService.open(SignInModalComponent, { centered: true });
        this.subscription = modalRef.closed.subscribe(() => {
          this.sessionID = this.signInService.getSessionFromCookie() || "-1";
          
          if (this.sessionID !== "-1") {
            this.socket.emit("joinGame", `${this.sessionID},${this.chessID}`);
            this.subscription.unsubscribe();
          }
        });
      } else {
        this.socket.emit("joinGame", `${this.sessionID},${this.chessID}`);
      }
    });

    this.socket.on('connect_error', (error) => {
      this.socket.disconnect();
      this.router.navigate(["/home"]);
    });

    this.socket.on("onJoinGame", response => {
      console.log("game joined!");
      this.chessSubject.next(response);
      this.chess = response;
      let link = window.location.href;
      link += this.chessID === -1 ? `/${response.chessID}` : "";
      this.link$ = of(link);
    });

    this.socket.on("onError", response => {
      window.alert(response);
      this.router.navigate(["/home"]);
    });

    this.socket.on("onGameReady", () => {
      this.gameReady = true;
      if (this.signInService.user.userID === this.chess.whitePlayer.userID) {
        this.canMove = true;
      }
    });

    this.socket.on("onNextTurnWhite", response => {
      this.chessSubject.next(response);
      this.chess = response;
      if (this.signInService.user.userID === this.chess.whitePlayer.userID) {
        this.canMove = true;
      } else {
        this.canMove = false;
      }
    }); 

    this.socket.on("onNextTurnBlack", response => {
      this.chessSubject.next(response);
      this.chess = response;
      if (this.signInService.user.userID === this.chess.blackPlayer.userID) {
        this.canMove = true;
      } else {
        this.canMove = false;
      }
    });
  }


  public getPossibleMoves(pieceID: number) {
    if (this.canMove) {
      return this.http.get<Space[]>(`${this.apiUrl}piece/possibleMoves/${pieceID}`);
    }
    return null;
  }

  public movePiece(pieceID: number, x: number, y: number) {
    if (this.canMove) {
      this.socket.emit("joinGame", `${this.sessionID},${this.chessID},${pieceID},${x},${y}`);
    }
  }

  public getBoardByID(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${id}`);
  }


  public emitMockSetupData(): Observable<string> {
    return from(this.tempSetupLog).pipe(
      concatMap(text => of(text)
        .pipe(delay(1000))
      )
    );
  }

  public emitMockGameData(): Observable<string> {
    return from(this.tempGameLog).pipe(
      concatMap(text => of(text)
        .pipe(delay(1000))
      )
    );
  }

  public getPlayers(): string[] {
    return this.players;
  }

}
