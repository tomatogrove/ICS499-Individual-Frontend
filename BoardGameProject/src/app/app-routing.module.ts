import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: 'home', component: HomeScreenComponent },
  { path: 'game', component: GameComponent },
  { path: 'game/:chessID', component: GameComponent },
  { path: 'my-games', component: MyGamesComponent },
  { path: 'my-stats', component: StatsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
