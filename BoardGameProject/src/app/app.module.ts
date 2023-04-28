import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { GameComponent } from './game/game.component';
import { StatsComponent } from './stats/stats.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { SignInModalComponent } from './modals/sign-in-modal/sign-in-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LeaveGameModalComponent } from './modals/leave-game-modal/leave-game-modal.component';
import { ForfeitGameModalComponent } from './modals/forfeit-game-modal/forfeit-game-modal.component';
import { CancelGameModalComponent } from './modals/cancel-game-modal/cancel-game-modal.component';
import { SignOutModalComponent } from './modals/sign-out-modal/sign-out-modal.component';
import { AlertModalComponent } from './modals/server-alert-modal/alert-modal.component';
import { PauseGameModalComponent } from './modals/pause-game-modal/pause-game-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    GameComponent,
    StatsComponent,
    MyGamesComponent,
    ChessBoardComponent,
    SignInModalComponent,
    LeaveGameModalComponent,
    ForfeitGameModalComponent,
    CancelGameModalComponent,
    SignOutModalComponent,
    AlertModalComponent,
    PauseGameModalComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
