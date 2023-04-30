import { Injectable } from '@angular/core';
import { concatMap, delay, from, Observable, of } from 'rxjs';
import { Board } from 'src/app/models/board';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = "http://localhost:8080/board";

  constructor(private http: HttpClient) { }

  public getBoardByID(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${id}`);
  }
}
