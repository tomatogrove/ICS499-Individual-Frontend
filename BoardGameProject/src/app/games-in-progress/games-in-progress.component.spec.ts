import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesInProgressComponent } from './games-in-progress.component';

describe('GamesInProgressComponent', () => {
  let component: GamesInProgressComponent;
  let fixture: ComponentFixture<GamesInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesInProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
