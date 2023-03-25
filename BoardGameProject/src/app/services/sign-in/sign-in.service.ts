import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  public signedIn: boolean = false;

  constructor() { }

  public signIn(): void {
    this.signedIn = true;
  }

  public signOut(): void {
    this.signedIn = false;
  }
}
