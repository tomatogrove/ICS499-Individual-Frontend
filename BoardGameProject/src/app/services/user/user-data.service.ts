import { Injectable } from '@angular/core';
import { SignInService } from '../sign-in/sign-in.service';
import { Chess } from 'src/app/models/chess';
import { UserAccount } from 'src/app/models/user-account';
import { Observable, map, of, switchMap } from 'rxjs';
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

  public getUserGames(): Observable<any> {
    return this.signInService.echo().pipe(switchMap((session) => {
      if (session && session.userAccount?.userAccountID) {
        return this.http.get<Chess[]>(`${this.apiUrl}/chess/all/${session.userAccount.userAccountID}`)
              .pipe(map((chessList) => {
                return {
                  chessList: chessList, 
                  userAccountID: this.signInService?.session?.userAccount?.userAccountID
                }
              }))
      } else {
        return of(null);
      }
    }));
  }
  
  public forfeitGame(gameToForfeit: Chess) {
    let userToForfeit = this.signInService.session.userAccount.userAccountID;

    return this.http.put<Chess>(`${this.apiUrl}/chess/forfeit/${userToForfeit}/${gameToForfeit.chessID}`, null);
  }


  public deleteGame(gameToRemove: Chess) {
    return this.http.delete(`${this.apiUrl}/chess/delete/${gameToRemove.chessID}`);
  }
}
