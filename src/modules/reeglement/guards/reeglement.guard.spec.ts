import { TestBed } from '@angular/core/testing';

import { ReeglementGuard } from './reeglement.guard';

describe('Reeglement Guards', () => {
    let reeglementGuard: ReeglementGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ReeglementGuard],
        });
        reeglementGuard = TestBed.get(ReeglementGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            reeglementGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
