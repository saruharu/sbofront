import { TestBed } from '@angular/core/testing';

import { TypereglementService } from './typereglement.service';

describe('TypereglementService', () => {
  let service: TypereglementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypereglementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
