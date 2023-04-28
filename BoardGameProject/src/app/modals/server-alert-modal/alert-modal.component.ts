import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  public title: string = "";

  public text: string = "";

  ok() {
    this.activeModal.close();
  }
}
