import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { CHEQUES } from '@modules/tables/data/cheques';
import { SortDirection } from '@modules/tables/directives';
import { Cheque } from '@modules/tables/models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
    cheques: Cheque[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1: number | string, v2: number | string) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

 function sort(cheques: Cheque[], column: string, direction: string): Cheque[] {
    if (direction === '') {
        return cheques;
    } else {
        return [...cheques].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
} 

function matches(cheque: Cheque, term: string, pipe: PipeTransform) {
    return (
        cheque.frs.toLowerCase().includes(term.toLowerCase()) ||
        pipe.transform(cheque.n_doc).includes(term) ||
        pipe.transform(cheque.montant).includes(term)
    );
}

@Injectable({ providedIn: 'root' })
export class ChequeService {
    /*
    getChequesByCriteria(currentMontant: any, currentIdSociete: any, currentIdUlbv: any, currentCnuf: number) {
        throw new Error("Method not implemented.");
    }
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _cheques$ = new BehaviorSubject<Cheque[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    constructor(private pipe: DecimalPipe) {
        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(120),
                switchMap(() => this._search()),
                delay(120),
                tap(() => this._loading$.next(false))
            )
            .subscribe(result => {
                this._cheques$.next(result.cheques);
                this._total$.next(result.total);
            });

        this._search$.next();
    }

    get cheques$() {
        return this._cheques$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    set page(page: number) {
        this._set({ page });
    }
    get pageSize() {
        return this._state.pageSize;
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    get searchTerm() {
        return this._state.searchTerm;
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: string) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let cheques = sort(CHEQUES, sortColumn, sortDirection);

        // 2. filter
        cheques = cheques.filter(cheque => matches(cheque, searchTerm, this.pipe));
        const total = cheques.length;

        // 3. paginate
        cheques = cheques.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ cheques, total });
    }
    */

}
