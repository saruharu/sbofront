import { TestBed } from '@angular/core/testing';

import { TypedocService } from './typedoc.service';

describe('TypedocService', () => {
  let service: TypedocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypedocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
