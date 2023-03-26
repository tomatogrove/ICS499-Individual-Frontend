import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChessInPlayComponent } from './chess-in-play/chess-in-play.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GamesInProgressComponent } from './games-in-progress/games-in-progress.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: 'home', component: HomeScreenComponent },
  { path: 'game-setup', component: GameSetupComponent },
  { path: 'game-in-play', component: ChessInPlayComponent },
  { path: 'my-games', component: GamesInProgressComponent },
  { path: 'my-stats', component: StatsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
