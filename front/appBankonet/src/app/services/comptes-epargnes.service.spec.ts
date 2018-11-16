import { TestBed } from '@angular/core/testing';

import { ComptesEpargnesService } from './comptes-epargnes.service';

describe('ComptesEpargnesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComptesEpargnesService = TestBed.get(ComptesEpargnesService);
    expect(service).toBeTruthy();
  });
});
