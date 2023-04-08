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
  public confirmEmail: string;
  public confirmPassword: string;
  public invalidEmail: string;
  public invalidUsername: string;

  constructor(
    public activeModal: NgbActiveModal, 
    private signInService: SignInService
  ) { }

  public ngOnInit() {
    console.log(this.form);
  }

  public signIn() {
    this.form.form.markAllAsTouched();
    if (this.form.valid) {
      this.signInService.signIn(this.userAccount).subscribe((session) => {
        if (session == null) {
          this.userAccount.userID = -1;
        } else {
          console.log("Signed in! Session Key: ", session.sessionKey);
          this.userAccount = session.userAccount;
          this.form.resetForm();
          this.navAway();
        }
      });
    }
  }

  public signUp(isGuest: boolean) {
    this.userAccount.guest = isGuest;
    this.form.form.markAllAsTouched();
    console.log(this.form)
    if (!isGuest && this.form.valid) {
      this.signInService.createUser(this.userAccount).subscribe((user) => {
        if (user.userID < 0) {

          this.userAccount = user;
          if (user.userID === -1) {
            this.invalidEmail = user.email;
            this.invalidUsername = user.username;
          } else if (user.userID === -2) {
            this.invalidEmail = user.email;
          } else if (user.userID === -3) {
            this.invalidUsername = user.username;
          }

          console.log("Error!!", user.userID);
        } else {
          this.signIn();
        }
        
      });
    }
  }

  public switchMode(mode: "signin" | "signup"): void {
    this.userAccount = new UserAccount();
    this.isSignIn = mode === "signin";
  }

  private navAway() {
    this.activeModal.close(); 
  }
}