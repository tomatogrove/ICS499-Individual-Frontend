import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Space } from 'src/app/models/space';
import { Board } from 'src/app/models/board';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  public getPossibleMoves(pieceID: number) {
    return this.http.get<Space[]>(`${this.apiUrl}piece/possibleMoves/${pieceID}`);
  }

  public movePiece(pieceID: number, x: number, y: number) {
    return this.http.put<Board>(`${this.apiUrl}piece/move/${pieceID}/${x}/${y}`, null);
  }

  public getBoardByID(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${id}`);
  }
}
