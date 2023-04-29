import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user/user-data.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent {
  
  constructor(public userDataService: UserDataService, public router: Router) { }

  public labels = ["Date Started", "Date Last Played", "Opponent", "Rejoin?"];
  public playerGames = [];

  ngOnInit() {
    // this.playerGames = this.userDataService.getUserGames().filter((game) => game.status === Status.ACTIVE);
  }

  public reJoinGame() {
    // this.router.navigate(['game']);
  }

  public removeGame(game) {
    // this.userDataService.deleteGame(game);
    // this.playerGames = this.userDataService.getUserGames().filter((game) => game.status === Status.ACTIVE);
  }
}
