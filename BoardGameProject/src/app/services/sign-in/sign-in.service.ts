import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  public signedIn: boolean = false;
  public signInText: string = "Sign In"
  public userId: number = 0;

  constructor(private router: Router) { }

  public signIn(): void {
    this.signedIn = true;
    this.userId = 1;
  }

  public signOut(): void {
    this.signedIn = false;
    this.router.navigate(['home']);
    this.userId = 0;
  }
}
