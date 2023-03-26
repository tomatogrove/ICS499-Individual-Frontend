import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInService } from 'src/app/services/sign-in/sign-in.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent {

  public isSignIn: boolean = true;

  constructor(public activeModal: NgbActiveModal, private signInService: SignInService) { }

  public signIn() {
    this.navAway();
  }

  public signUp(isGuest: boolean) {
    this.navAway();
  }

  private navAway() {
    this.signInService.signIn();
    this.activeModal.close(); 
  }
}
