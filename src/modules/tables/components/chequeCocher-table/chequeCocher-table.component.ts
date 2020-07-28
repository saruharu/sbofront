import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Cheque } from '@modules/tables/models';
import { ChequeService } from '@modules/tables/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-chequeCocher-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './chequeCocher-table.component.html',
    styleUrls: ['chequeCocher-table.component.scss'],
})
export class ChequeCocherTableComponent implements OnInit {
    @Input() pageSize = 4;

    cheques$!: Observable<Cheque[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public chequeService: ChequeService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
       // this.chequeService.pageSize = this.pageSize;
        //this.cheques$ = this.chequeService.cheques$;
        //this.total$ = this.chequeService.total$;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        //this.chequeService.sortColumn = column;
        //this.chequeService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }
}
