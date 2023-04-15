import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { GameComponent } from './game/game.component';
import { StatsComponent } from './stats/stats.component';
import { GamesInProgressComponent } from './games-in-progress/games-in-progress.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { SignInModalComponent } from './modals/sign-in-modal/sign-in-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    GameComponent,
    StatsComponent,
    GamesInProgressComponent,
    ChessBoardComponent,
    SignInModalComponent,
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
