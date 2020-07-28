import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { FactureService } from './facture.service';

describe('FactureService', () => {
    let factureService: FactureService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FactureService, DecimalPipe],
        });
        factureService = TestBed.get(FactureService);
    });

    describe('factures$', () => {
        it('should return Observable<Facture[]>', () => {
            factureService.factures$.subscribe(response => {
                expect(response).toBeDefined();
            });
        });
    });
});
