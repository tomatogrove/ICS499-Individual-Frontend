import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInService } from 'src/app/services/sign-in/sign-in.service';

@Component({
  selector: 'app-sign-out-modal',
  templateUrl: './sign-out-modal.component.html',
  styleUrls: ['./sign-out-modal.component.css']
})
export class SignOutModalComponent {

  constructor(
    public activeModal: NgbActiveModal, 
    private router: Router,
    private signInService: SignInService
  ) { }
  

  public signOut() {
    this.signInService.signOut().subscribe((response) => {
      if (response) {
        this.router.navigate(['home']);
        this.activeModal.close();
      }
    });
  }
  
  public cancel() {
    this.activeModal.close(); 
  }
}
