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
import { SignInModalComponent } from './modals/sign-in-modal/sign-in-modal.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
