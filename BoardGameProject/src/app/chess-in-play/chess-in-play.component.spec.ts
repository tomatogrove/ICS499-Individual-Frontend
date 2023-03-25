import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessInPlayComponent } from './chess-in-play.component';

describe('ChessInPlayComponent', () => {
  let component: ChessInPlayComponent;
  let fixture: ComponentFixture<ChessInPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessInPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessInPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
