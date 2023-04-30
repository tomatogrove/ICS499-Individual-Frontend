import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-join-game-modal',
  templateUrl: './join-game-modal.component.html',
  styleUrls: ['./join-game-modal.component.css']
})
export class JoinGameModalComponent {

  public form: FormGroup;
  public urlInvalid: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  public ngOnInit() {
    this.form = new FormGroup({
      url: new FormControl("http://localhost:4200/game/", [Validators.required, this.validateUrl])
    })
  }

  public joinGame() {
    this.form.markAllAsTouched();
    if (!this.form.errors && this.form.valid) {
      let chessID  = this.form.get('url').value.split("game/")[1];
      this.activeModal.close(chessID);
    }
  }

  public validateUrl(control: AbstractControl): ValidationErrors {
    if (/^(http:\/\/)?localhost:4200\/game\/\d+$/.test(control.value)) {
        return null;
    } else {
        return { invalidUrl: true };
    }
  }

}
