import { SignInService } from '../services/sign-in/sign-in.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInModalComponent } from '../modals/sign-in-modal/sign-in-modal.component';
import { Subscription, of, switchMap } from 'rxjs';
import { JoinGameModalComponent } from '../modals/join-game-modal/join-game-modal.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit, OnDestroy {

  public showSignInModal: boolean = false;
  private subscriptions: Subscription[];

  constructor(
    private signInService: SignInService, 
    private router: Router,
    private modalService: NgbModal
  ) { 
    this.subscriptions = [];
  }

  public ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public newGame(): void {
    if (!this.signInService.signedIn) {
      const modalRef = this.modalService.open(SignInModalComponent, { centered: true });
      this.subscriptions.push(modalRef.closed.subscribe(() => {
        this.router.navigate(['game']);
      }));
    } else {
      this.router.navigate(['game']);
    }
  }

  public joinGame(): void {
    if (!this.signInService.signedIn) {
      let modalRef = this.modalService.open(SignInModalComponent, { centered: true });

      this.subscriptions.push(modalRef.closed.pipe(switchMap((signedIn: boolean) => {
        if (signedIn) {
          modalRef = this.modalService.open(JoinGameModalComponent, { centered: true});
          return modalRef.closed;
        }
        return of(null);
      })).subscribe((chessID) => {
        if (chessID) {
          this.router.navigate([`game/${chessID}`]);
        }
      }))
    } else {
      const modalRef = this.modalService.open(JoinGameModalComponent, { centered: true});
      this.subscriptions.push(modalRef.closed.subscribe((chessID) => {
        if (chessID) {
          this.router.navigate([`game/${chessID}`]);
        }
      }))
    }
  }
}
