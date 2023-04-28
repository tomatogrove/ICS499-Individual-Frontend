import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancel-game-modal',
  templateUrl: './cancel-game-modal.component.html',
  styleUrls: ['./cancel-game-modal.component.css']
})
export class CancelGameModalComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  public keepMatch() {
    this.activeModal.close(false);
  }

  public cancelMatch() {
    this.activeModal.close(true);
  }
}
