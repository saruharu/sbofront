import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppCommonService {
    constructor() {}
    public date: any;

    getAppCommon$(): Observable<{}> {
        return of({});
    }

}
