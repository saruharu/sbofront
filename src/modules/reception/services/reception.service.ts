import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ReceptionService {
    constructor() {}

    getReception$(): Observable<{}> {
        return of({});
    }
}
