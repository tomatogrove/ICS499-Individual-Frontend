import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalHandlerService {

  public modal: Subject<any> = new Subject<any>();

  constructor() { }
}
