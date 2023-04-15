import { Injectable } from '@angular/core';
import { concatMap, delay, from, Observable, of } from 'rxjs';
import { Board } from 'src/app/models/board';
import { HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) { }

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

  public getBoardByID(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${id}`);
  }
}
