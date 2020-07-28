import { TestBed } from '@angular/core/testing';

import { ReeglementService } from './reeglement.service';

describe('ReeglementService', () => {
    let reeglementService: ReeglementService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReeglementService],
        });
        reeglementService = TestBed.get(ReeglementService);
    });

    describe('getReeglement$', () => {
        it('should return Observable<Reeglement>', () => {
            reeglementService.getReeglement$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
