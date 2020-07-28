import { TestBed } from '@angular/core/testing';

import { TypepaiementService } from './typepaiement.service';

describe('TypepaiementService', () => {
  let service: TypepaiementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypepaiementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
