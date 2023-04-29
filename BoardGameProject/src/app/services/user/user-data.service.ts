import { Injectable } from '@angular/core';
import { SignInService } from '../sign-in/sign-in.service';
import { Chess } from 'src/app/models/chess';
import { UserAccount } from 'src/app/models/user-account';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private apiUrl: string = "http://localhost:8080";

  constructor(
    public signInService: SignInService, 
    private http: HttpClient
  ) { }

  public getUserGames(): Observable<UserAccount> {
    return this.signInService.echo().pipe(switchMap((session) => {
      if (session && session.userAccount?.userAccountID) {
        return this.http.get<UserAccount>(`${this.apiUrl}/users/${session.userAccount.userAccountID}`)
      } else {
        return null;
      }
    }));
  }
  
  public forfeitGame() {

  }


  public deleteGame(gameToRemove: Chess) {

    // this.games = this.games.filter((game) => game.gameID !== gameToRemove.gameID)
  }
}


export interface Game {
  gameID: number;
  dateStarted: string;
  dateLatest: string;
  opponent: string;
  status: Status;
}

export enum Status {
  ACTIVE,
  LOST,
  WON
} 
