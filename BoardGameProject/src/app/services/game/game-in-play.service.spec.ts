import { TestBed } from '@angular/core/testing';
import { GameInPlayService } from './game-in-play.service';

import { } from './game-setup.service';

describe('GameSetupService', () => {
  let service: GameInPlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameInPlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});