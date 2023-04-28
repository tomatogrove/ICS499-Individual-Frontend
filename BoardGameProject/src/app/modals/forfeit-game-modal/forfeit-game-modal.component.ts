import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forfeit-game-modal',
  templateUrl: './forfeit-game-modal.component.html',
  styleUrls: ['./forfeit-game-modal.component.css']
})
export class ForfeitGameModalComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) { }


  public forfeit() {
    this.activeModal.close(true);
  }

  public cancel() {
    this.activeModal.close(false);
  }
}
