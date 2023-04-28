import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseGameModalComponent } from './pause-game-modal.component';

describe('PauseGameModalComponent', () => {
  let component: PauseGameModalComponent;
  let fixture: ComponentFixture<PauseGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauseGameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PauseGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
