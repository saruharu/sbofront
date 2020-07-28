import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ReeglementService {
    constructor() {}

    getReeglement$(): Observable<{}> {
        return of({});
    }
}
