import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pause-game-modal',
  templateUrl: './pause-game-modal.component.html',
  styleUrls: ['./pause-game-modal.component.css']
})
export class PauseGameModalComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  public pause() {
    this.activeModal.close(true);
  }

  public cancel() {
    this.activeModal.close(false);
  }
}
