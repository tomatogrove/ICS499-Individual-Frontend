import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game, Status, UserDataService } from '../services/user/user-data.service';

@Component({
  selector: 'app-games-in-progress',
  templateUrl: './games-in-progress.component.html',
  styleUrls: ['./games-in-progress.component.css']
})
export class GamesInProgressComponent {
  
  constructor(public userDataService: UserDataService, public router: Router) { }

  public labels = ["Date Started", "Date Last Played", "Opponent", "Rejoin?"];
  public playerGames: Game[] = [];

  ngOnInit() {
    this.playerGames = this.userDataService.getUserData().filter((game) => game.status === Status.ACTIVE);
  }

  public reJoinGame() {
    this.router.navigate(['game-setup']);
  }

  public removeGame(game: Game) {
    this.userDataService.removeGame(game);
    this.playerGames = this.userDataService.getUserData().filter((game) => game.status === Status.ACTIVE);
  }
}
