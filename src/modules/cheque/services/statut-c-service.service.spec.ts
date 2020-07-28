import { TestBed } from '@angular/core/testing';

import { StatutCServiceService } from './statut-c-service.service';

describe('StatutCServiceService', () => {
  let service: StatutCServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatutCServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
