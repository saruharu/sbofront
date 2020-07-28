import { TestBed } from '@angular/core/testing';

import { ReceptionService } from './reception.service';

describe('ReceptionService', () => {
    let receptionService: ReceptionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReceptionService],
        });
        receptionService = TestBed.get(ReceptionService);
    });

    describe('getReception$', () => {
        it('should return Observable<Reception>', () => {
            receptionService.getReception$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
