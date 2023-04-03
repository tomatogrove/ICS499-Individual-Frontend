import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Space } from 'src/app/models/space';
import { Piece } from 'src/app/models/piece';

@Injectable({
  providedIn: 'root'
})
export class GameInPlayService {

  private apiUrl = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  public getPossibleMoves(pieceID: number) {
    return this.http.get<Space[]>(`${this.apiUrl}piece/possibleMoves/${pieceID}`);
  }

  public movePiece(pieceID: number, x: number, y: number) {
    return this.http.put<Piece>(`${this.apiUrl}piece/move/${pieceID}/${x}/${y}`, null);
  }
}
