import { TestBed } from '@angular/core/testing';

import { FactureAgService } from './facture-ag.service';

describe('FactureAgService', () => {
  let service: FactureAgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactureAgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
