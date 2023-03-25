import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../services/sign-in/sign-in.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {

  public showSignInModal: boolean = false;

  constructor(public signInService: SignInService, private router: Router) { }

  public selectChess(): void {
    if (!this.signInService.signedIn) {
      this.showSignInModal = true;
    } else {
      this.router.navigate(['game-setup']);
    }
  }
}
