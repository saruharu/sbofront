import { TestBed } from '@angular/core/testing';

import { ReceptionGuard } from './reception.guard';

describe('Reception Guards', () => {
    let receptionGuard: ReceptionGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ReceptionGuard],
        });
        receptionGuard = TestBed.get(ReceptionGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            receptionGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
