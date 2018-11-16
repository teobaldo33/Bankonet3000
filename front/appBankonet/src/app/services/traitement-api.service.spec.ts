import { TestBed } from '@angular/core/testing';

import { TraitementAPIService } from './traitement-api.service';

describe('TraitementAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraitementAPIService = TestBed.get(TraitementAPIService);
    expect(service).toBeTruthy();
  });
});
