import { Injectable } from '@angular/core';
import { SignInService } from '../sign-in/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public games: Game[] = 
  [
    { gameID: 1, dateStarted: '03/21/23', dateLatest: '03/23/23', opponent:'guest123', status: Status.ACTIVE},
    { gameID: 2, dateStarted: '03/22/23', dateLatest: '03/26/23', opponent:'fredB', status: Status.ACTIVE},
    { gameID: 3, dateStarted: '03/23/23', dateLatest: '03/27/23', opponent:'fredB', status: Status.WON},
    { gameID: 4, dateStarted: '03/24/23', dateLatest: '03/25/23', opponent:'guestabc', status: Status.WON},
    { gameID: 5, dateStarted: '03/25/23', dateLatest: '03/25/23', opponent:'janeIE', status: Status.LOST}
  ];

  constructor(public signInService: SignInService) { }

  public getUserData(): Game[] {
    if (this.signInService.session.userAccount) {
      return this.games;
    }
    return [];
  }
  
  public removeGame(gameToRemove: Game): void {
    this.games = this.games.filter((game) => game.gameID !== gameToRemove.gameID)
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
