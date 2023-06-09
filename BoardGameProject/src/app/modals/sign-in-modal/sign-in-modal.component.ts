import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public isSignIn: boolean = true;

  public errorCode: number = 0;
  public signInFailed: boolean = false;
  public invalidEmail: string;
  public invalidUsername: string;

  public signInForm: FormGroup;
  public signUpForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal, 
    private router: Router,
    private signInService: SignInService
  ) { }

  public ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    this.signUpForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      emailConfirm: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required)
    });
  }

  public ngOnDestroy() {
    if (!this.signInService.signedIn) {
      this.router.navigate(["/home"]);
    }
  }

  public signIn(user: UserAccount = null) {
    this.signInForm.markAllAsTouched();
    if (user || this.signInForm.valid) {
      this.signInService.signIn(user || this.signInForm.value).subscribe((session) => {
        if (session == null) {
          this.signInFailed = true;
        } else {
          this.signInFailed = false;
          this.signInForm.reset();
          this.navAway();
        }
      });
    }
  }

  public signUp() {
    this.signUpForm.markAllAsTouched();
    if (this.validateForm()) {
      this.signInService.createUser({
        userAccountID: null,
        username: this.signUpForm.get("username").value,
        email: this.signUpForm.get("email").value,
        password: this.signUpForm.get("password").value,
        session: null,
        chessList: []
      }).subscribe((user) => {
        this.errorCode = user.userAccountID;

        if (this.errorCode < 0) {
          if (this.errorCode === -1) {
            this.invalidEmail = user.email;
            this.invalidUsername = user.username;
          } else if (this.errorCode === -2) {
            this.invalidEmail = user.email;
          } else if (this.errorCode === -3) {
            this.invalidUsername = user.username;
          }
        } else {
          this.errorCode = 0;
          this.signUpForm.reset();
          this.signIn(user);
        }
      });
    }
  }

  public switchMode(mode: "signin" | "signup"): void {
    if(mode === "signin"){
      this.isSignIn = true;
      this.signUpForm.reset();
    } else {
      this.isSignIn = false;
      this.signInForm.reset();
    }
  }

  // Tests an address based on these three main criteria
  // Address contains at least one @
  // The local-part is non-empty
  // The domain contains at least one period
  public isValidEmailFormat(value: string) {
    if (!value || value.length < 3) {
      return false;
    } else if (!value.includes('@')) {
      return false;
    } else if (value.slice(0, value.indexOf('@')).length < 1) {
      return false;
    } else if (!value.slice(value.indexOf('@')).includes('.')) {
      return false;
    }

    return true;
  }

  private validateForm(): boolean {
    return this.signUpForm.valid &&
      this.signUpForm.get("email").value === this.signUpForm.get("emailConfirm").value &&
      this.signUpForm.get("password").value === this.signUpForm.get("passwordConfirm").value;
  }

  private navAway() {
    this.errorCode = 0;
    this.activeModal.close(this.signInService.signedIn); 
  }
}
