import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'BoardGameProject';
  public signedIn: boolean = false;

  public visitGames(): void{

  }

  public visitMyGames(): void{

  }
}
