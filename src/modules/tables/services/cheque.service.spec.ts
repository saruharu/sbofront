import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { ChequeService } from './cheque.service';

describe('ChequeService', () => {
    let chequeService: ChequeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChequeService, DecimalPipe],
        });
        chequeService = TestBed.get(ChequeService);
    });

    describe('cheques$', () => {
        it('should return Observable<Cheque[]>', () => {
            chequeService.cheques$.subscribe(response => {
                expect(response).toBeDefined();
            });
        });
    });
});
