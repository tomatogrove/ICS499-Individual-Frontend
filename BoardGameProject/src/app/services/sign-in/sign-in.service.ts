import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Session } from 'src/app/models/session';
import { UserAccount } from 'src/app/models/user-account';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  public signedIn: boolean = false;
  public signInText: string = "Sign In";
  public user: UserAccount;
  public session: Session;

  private apiUrl: string = "http://localhost:8080";

  constructor(
    private router: Router, 
    private http: HttpClient
  ) { }

  public echo(): Observable<Session> {
    if (document.cookie.includes("key")) {
      let key = document.cookie.split(";")[0].split("=")[1];
      console.log(key);
      console.log(`${this.apiUrl}/session/echo/${key}`);
      return this.http.get<Session>(`${this.apiUrl}/session/echo/${key}`).pipe(map((session) => {
        if (session) {
          this.signedIn = true;
          this.session = session;
          this.user = session.userAccount;
        } 
        return null;
      }))
    }
    return of(null);
  }

  public signIn(userAccount: UserAccount): Observable<Session>  {
    document.cookie = "";
    this.session = new Session();
    this.session.userAccount = userAccount;
    return this.http.post<Session>(`${this.apiUrl}/session/login`, this.session).pipe(map((session) => {
      if (session) {
        this.signedIn = true;
        this.session = session;
        document.cookie = `key=${session.sessionKey}`;
      }
      return session;
    }));
  }

  public signOut(): Observable<boolean> {
    console.log(this.session.sessionID)
    return this.http.delete<boolean>(`${this.apiUrl}/session/logout/${this.session.sessionID}`).pipe(map((deleted) => {
      if (deleted) {
        console.log("deleted");
        this.signedIn = false;
        this.user = null;
        document.cookie = "";
      }
      console.log("possibly deleted?")
      return deleted;
    }));
  }

  public createUser(userAccount: UserAccount): Observable<UserAccount>  {
    console.log("in create user");
    return this.http.post<UserAccount>(`${this.apiUrl}/users/add`, userAccount).pipe(map((user) => {
      if (user.username !== userAccount.username) {
        user.username = null;
      }
      if (user.email !== userAccount.email) {
        user.email = null;
      }

      if (user.email !== null && user.username !== null) {
        this.user = user;
      }

      return user;
    }));
  }
}
