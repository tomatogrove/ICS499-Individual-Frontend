import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user/user-data.service';
import { Subscription } from 'rxjs';
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
      this.username = session.userAccount.username
      console.log("stats component", this.username)
    })));

    this.subscriptions.push(this.userDataService.getUserGames().subscribe((gamesAndUserID) => {
      this.playerGames = gamesAndUserID.chessList.filter((game) => game.status === "ACTIVE" && game.blackPlayer)
        .map((game) => {
          let isUserWhitePlayer = game.whitePlayer.userAccountID === this.signInService.session.userAccount.userAccountID
          return {
            ...game,
            opponent: isUserWhitePlayer ? game.blackPlayer.username : game.whitePlayer.username
          }
        });
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
    this.subscriptions.push(modalRef.closed.subscribe((forfeit?: boolean) => {
      if (forfeit) {
        this.userDataService.forfeitGame(game);
        this.playerGames = this.playerGames.filter((g) => g !== game);
      }
    }))
  }
}
