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
  public session: Session = new Session();

  private apiUrl: string = "http://localhost:8080";

  constructor(
    private router: Router, 
    private http: HttpClient
  ) { }

  public echo(): Observable<Session> {
    if (this.session.userAccount) {
      return of(this.session);
    }
    if (document.cookie.includes("key")) {
      let key = document.cookie.split(";")[0].split("=")[1];
      console.log(key);
      console.log(`${this.apiUrl}/session/echo/${key}`);
      console.log("trying to start session");
      return this.http.get<Session>(`${this.apiUrl}/session/echo/${key}`).pipe(map((session) => {
        if (session) {
          this.signedIn = true;
          this.session = session;
          console.log("the session has started", session);
          return session;
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
        document.cookie = `key=${session.sessionKey}; Path=/;`;
      }
      return session;
    }));
  }

  public createUser(userAccount: UserAccount): Observable<UserAccount>  {
    console.log("in create user");
    return this.http.post<UserAccount>(`${this.apiUrl}/users/add`, userAccount).pipe(map((user) => {
      return user;
    }));
  }

  public signOut(): Observable<boolean> {
    console.log(this.session.sessionID)
    return this.http.delete<boolean>(`${this.apiUrl}/session/logout/${this.session.sessionID}`).pipe(map((deleted) => {
      if (deleted) {
        console.log("deleted");
        this.signedIn = false;
        this.session = null;
        document.cookie = "key=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }
      console.log("possibly deleted?")
      return deleted;
    }));
  }

  public getSessionFromCookie(): string {
    return document.cookie.split("; ").find((row) => row.startsWith("key="))?.split("=")[1];
  }
}
