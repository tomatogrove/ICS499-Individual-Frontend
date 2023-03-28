import { Injectable } from '@angular/core';
import { concatMap, delay, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameSetupService {

  public tempSetupLog: string[] = [
    "exampleUser joined the game as Player 1",
    "...",
    "guest123 joined the game as Player 2",
    "...",
    "Game is ready to start!"
  ];

  public tempGameLog: string[] = [
    "Game Opened for exampleUser as Player 1 and guest123 as Player 2",
    "...",
    "exampleUser starts",
    "..."
  ]

  public players: string[] = ["exampleUser", "guest123"];

  constructor() { }

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

  // Not a fan of this one that much tbh.......
  // public nextPlayer(current: string) {
  //   let next = current === "Player 1" ? "Player 2" : "Player 1";
  //   this.tempGameLog.push(next);
  //   this.tempGameLog.push("...");
  // }
}
