import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfeitGameModalComponent } from './forfeit-game-modal.component';

describe('ForfeitGameModalComponent', () => {
  let component: ForfeitGameModalComponent;
  let fixture: ComponentFixture<ForfeitGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForfeitGameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForfeitGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
