import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelGameModalComponent } from './cancel-game-modal.component';

describe('CancelGameModalComponent', () => {
  let component: CancelGameModalComponent;
  let fixture: ComponentFixture<CancelGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelGameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
