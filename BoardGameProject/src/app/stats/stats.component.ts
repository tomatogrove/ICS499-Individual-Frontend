import { Component } from '@angular/core';
import { UserDataService } from '../services/user/user-data.service';
import { SignInService } from '../services/sign-in/sign-in.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  public gameStats = {allGames: 0, activeGames: 0, wonGames: 0, lostGames: 0};
  public username: string = "";
  public loading: boolean = true;

  constructor(
    public userDataService: UserDataService,
    public signInService: SignInService
  ) {}

  ngOnInit() {
    this.userDataService.getUserGames().subscribe((user) => {
      console.log("user", user.username)
      this.username = user.username;
      if (user && user.chessList) {
        user.chessList.forEach((game) => {
          if (game.blackPlayer && game.whitePlayer) {
            let gameWinner = game.winner;
            if (game.status === "ACTIVE") {
              this.gameStats.activeGames++;
            } else if (gameWinner.userAccountID === user.userAccountID) {
              this.gameStats.wonGames++;
            } else if (gameWinner.userAccountID === user.userAccountID && game.status === "DONE") {
              this.gameStats.lostGames++;
            }
              this.gameStats.allGames++;
          }
        })
      }
      this.loading = false;
    });
  }

}
