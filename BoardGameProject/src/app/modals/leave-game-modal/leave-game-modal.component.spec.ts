import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveGameModalComponent } from './leave-game-modal.component';

describe('LeaveGameModalComponent', () => {
  let component: LeaveGameModalComponent;
  let fixture: ComponentFixture<LeaveGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveGameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
