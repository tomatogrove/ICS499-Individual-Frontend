import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAccount } from 'src/app/models/user-account';
import { SignInService } from 'src/app/services/sign-in/sign-in.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent {
  @ViewChild('form', { static: false }) form: NgForm;

  public userAccount: UserAccount = new UserAccount;
  public isSignIn: boolean = true;

  constructor(
    public activeModal: NgbActiveModal, 
    private signInService: SignInService
  ) { }

  public signIn() {
    this.signInService.signIn(this.userAccount).subscribe((session) => {
      if (session == null) {
        console.log("Error!!");
      } else {
        console.log("Signed in! Session Key: ", session.sessionKey);
        this.form.resetForm();
        this.navAway();
        // mark username and password as invalid
      }
    });
  }

  public signUp(isGuest: boolean) {
    this.userAccount.guest = isGuest;
    if (!isGuest) {
      this.signInService.createUser(this.userAccount).subscribe((user) => {
        if (user.username === null || user.email === null) {
          console.log("Error!!");
          // mark field as touched, and invalidate it as duplicate 
          // this.userAccount = user;
          this.form.form.markAllAsTouched();
        } else {
          this.userAccount = user;
          this.signIn();
        }
      });
    }
  }

  private navAway() {
    this.activeModal.close(); 
  }
}
