import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user/user-data.service';
import { Subscription, of, switchMap } from 'rxjs';
import { SignInService } from '../services/sign-in/sign-in.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForfeitGameModalComponent } from '../modals/forfeit-game-modal/forfeit-game-modal.component';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent {
  public subscriptions: Subscription[] = [];
  
  public labels: string[] = ["Date Started", "Date Last Played", "Opponent", "Rejoin?"];
  public playerGames: any[] = [];
  public username: string = "";
  
  constructor(
    public userDataService: UserDataService, 
    public router: Router,
    public signInService: SignInService,
    private modalService: NgbModal
  ) { }

  public ngOnInit() {
    this.subscriptions.push(this.signInService.echo().subscribe(((session) => {
      if (!session) {
        this.router.navigate(['home']);
      } else {
        this.username = session.userAccount.username;
      }
    })));

    this.subscriptions.push(this.userDataService.getUserGames().subscribe((gamesAndUserID) => {
      if (!gamesAndUserID) {
        this.router.navigate(['home']);
      } else {
        this.playerGames = gamesAndUserID.chessList.filter((game) => game.status === "ACTIVE" && game.blackPlayer)
          .map((game) => {
            let isUserWhitePlayer = game.whitePlayer.userAccountID === this.signInService.session.userAccount.userAccountID;
            return {
              ...game,
              opponent: isUserWhitePlayer ? game.blackPlayer.username : game.whitePlayer.username
            }
          });
      }
    }));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public reJoinGame(game) {
    this.router.navigate([`game/${game.chessID}`]);
  }

  public forfeitGame(game) {
    const modalRef = this.modalService.open(ForfeitGameModalComponent, { centered: true });
    this.subscriptions.push(modalRef.closed.pipe(switchMap((forfeit?: boolean) => {
        if (forfeit) {
          return this.userDataService.forfeitGame(game);
        }
        return of(null);
      })).subscribe((game) => {
        if (game) {
          this.ngOnInit();
        }
      })
    );
  }
}
