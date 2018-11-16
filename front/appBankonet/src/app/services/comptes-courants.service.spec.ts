import { TestBed } from '@angular/core/testing';

import { ComptesCourantsService } from './comptes-courants.service';

describe('ComptesCourantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComptesCourantsService = TestBed.get(ComptesCourantsService);
    expect(service).toBeTruthy();
  });
});
