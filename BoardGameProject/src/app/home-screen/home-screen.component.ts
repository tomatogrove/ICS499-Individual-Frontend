import { SignInService } from '../services/sign-in/sign-in.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignInModalComponent } from '../modals/sign-in-modal/sign-in-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent {

  public showSignInModal: boolean = false;
  private subscription: Subscription; 

  constructor(
    private signInService: SignInService, 
    private router: Router,
    private modalService: NgbModal
  ) { 
    this.subscription = new Subscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public selectChess(): void {
    if (!this.signInService.signedIn) {
      const modalRef = this.modalService.open(SignInModalComponent, { centered: true });
      this.subscription = modalRef.closed.subscribe(() => {
        this.router.navigate(['game-setup']);
        this.subscription.unsubscribe();
      });
    } else {
      this.router.navigate(['game-setup']);
    }
  }
}
