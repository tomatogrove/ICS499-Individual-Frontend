import { Component } from '@angular/core';
import { Status, UserDataService } from '../services/user/user-data.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  public gameStats = {allGames: 0, activeGames: 0, wonGames: 0, lostGames: 0};

  constructor(public userDataService: UserDataService) {}

  ngOnInit() {
    const userGames = this.userDataService.getUserData();
    userGames.forEach((game) => {
      if (game.status === Status.ACTIVE) {
        this.gameStats.activeGames++;
      } else if (game.status === Status.WON) {
        this.gameStats.wonGames++;
      } else if (game.status === Status.LOST) {
        this.gameStats.lostGames++;
      }
      this.gameStats.allGames++;
    });
  }

}
