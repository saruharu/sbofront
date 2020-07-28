import { TestBed } from '@angular/core/testing';

import { UserlbvService } from './userlbv.service';

describe('UserlbvService', () => {
  let service: UserlbvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserlbvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
