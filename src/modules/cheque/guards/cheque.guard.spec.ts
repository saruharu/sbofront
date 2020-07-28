import { TestBed } from '@angular/core/testing';

import { ChequeGuard } from './cheque.guard';

describe('Cheque Guards', () => {
    let chequeGuard: ChequeGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ChequeGuard],
        });
        chequeGuard = TestBed.get(ChequeGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            chequeGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
