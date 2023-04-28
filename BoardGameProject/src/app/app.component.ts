import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SignInModalComponent } from './modals/sign-in-modal/sign-in-modal.component';
import { SignInService } from './services/sign-in/sign-in.service';
import { SignOutModalComponent } from './modals/sign-out-modal/sign-out-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private subscription: Subscription; 

  constructor(
    public router: Router,
    public modalService: NgbModal,
    public signInService: SignInService
  ) { 
    this.subscription = new Subscription();
  }

  public ngOnInit() {
    this.signInService.echo().subscribe();
  }

  public signIn(): void {
    this.modalService.open(SignInModalComponent, { centered: true });
  }

  public signOut(): void {
    this.modalService.open(SignOutModalComponent, { centered: true });
  }

  public visitHome(): void {
    this.router.navigate(['home']);
  }

  public visitGames(): void{
    this.tryToNavigate('my-games');
  }

  public visitMyGames(): void{
    this.tryToNavigate('my-stats');
  }

  public tryToNavigate(destination: string) {
    if (!this.signInService.signedIn) {
      const modalRef = this.modalService.open(SignInModalComponent, { centered: true });
      this.subscription = modalRef.closed.subscribe(() => {
        this.router.navigate([destination]);
        this.subscription.unsubscribe();
      });
    } else {
      this.router.navigate([destination]);
    }
  }
}
