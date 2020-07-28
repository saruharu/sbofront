import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { FACTURES } from '@modules/tables/data/factures';
import { SortDirection } from '@modules/tables/directives';
import { Facture } from '@modules/tables/models';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
    factures: Facture[];
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

 function sort(factures: Facture[], column: string, direction: string): Facture[] {
    if (direction === '') {
        return factures;
    } else {
        return [...factures].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
} 

function matches(facture: Facture, term: string, pipe: PipeTransform) {
    return (
        facture.frs.toLowerCase().includes(term.toLowerCase()) ||
        pipe.transform(facture.id_facture).includes(term) ||
        pipe.transform(facture.montant).includes(term)
    );
}

@Injectable({ providedIn: 'root' })
export class FactureService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _factures$ = new BehaviorSubject<Facture[]>([]);
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
                this._factures$.next(result.factures);
                this._total$.next(result.total);
            });

        this._search$.next();
    }

    get factures$() {
        return this._factures$.asObservable();
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
        let factures = sort(FACTURES, sortColumn, sortDirection);

        // 2. filter
        factures = factures.filter(facture => matches(facture, searchTerm, this.pipe));
        const total = factures.length;

        // 3. paginate
        factures = factures.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ factures, total });
    }
}
