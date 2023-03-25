import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { ChessInPlayComponent } from './chess-in-play/chess-in-play.component';
import { StatsComponent } from './stats/stats.component';
import { GamesInProgressComponent } from './games-in-progress/games-in-progress.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    GameSetupComponent,
    ChessInPlayComponent,
    StatsComponent,
    GamesInProgressComponent,
    ChessBoardComponent,
    SignInModalComponent,
    SignUpModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
