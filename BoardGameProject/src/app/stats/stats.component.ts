import { Component } from '@angular/core';
import { UserDataService } from '../services/user/user-data.service';
import { SignInService } from '../services/sign-in/sign-in.service';
import { Subscription, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  public gameStats = {allGames: 0, activeGames: 0, wonGames: 0, lostGames: 0};
  public username: string = "";
  public loading: boolean = true;

  public subscription: Subscription[] = [];

  constructor(
    public userDataService: UserDataService,
    public signInService: SignInService
  ) {}

  public ngOnInit() {
    this.subscription.push(this.signInService.echo().subscribe(((session) => {
      this.username = session.userAccount.username
      console.log("stats component", this.username)
    })));

    this.subscription.push(this.userDataService.getUserGames().subscribe((gamesAndUserID) => {
        if (gamesAndUserID && gamesAndUserID.chessList.length > 0) {
          gamesAndUserID.chessList.forEach((game) => {
            if (game.blackPlayer && game.whitePlayer) {
              let gameWinner = game.winner;
              if (game.status === "ACTIVE") {
                this.gameStats.activeGames++;
              } else if (gameWinner.userAccountID === gamesAndUserID.userAccountID) {
                this.gameStats.wonGames++;
              } else if (gameWinner.userAccountID === gamesAndUserID.userAccountID && game.status === "DONE") {
                this.gameStats.lostGames++;
              }
                this.gameStats.allGames++;
            }
          })
        }
        this.loading = false;
      })
    );
  }

  public ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

}
