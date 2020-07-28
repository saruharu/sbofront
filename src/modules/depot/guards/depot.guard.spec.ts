import { TestBed } from '@angular/core/testing';

import { DepotGuard } from './depot.guard';

describe('Depot Guards', () => {
    let depotGuard: DepotGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [DepotGuard],
        });
        depotGuard = TestBed.get(DepotGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            depotGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
