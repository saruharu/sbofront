import { TestBed } from '@angular/core/testing';

import { StatutFService } from './statut-f.service';

describe('StatutFService', () => {
  let service: StatutFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatutFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
