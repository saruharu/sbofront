import { TestBed } from '@angular/core/testing';

import { ChequeService } from './cheque.service';

describe('ChequeService', () => {
    let chequeService: ChequeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChequeService],
        });
        chequeService = TestBed.get(ChequeService);
    });

    /*
    describe('getCheque$', () => {
        it('should return Observable<Cheque>', () => {
            chequeService.getCheque$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });*/
});

