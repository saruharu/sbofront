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
import { Facture } from '@modules/tables/models';
import { FactureService } from '@modules/tables/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    @Input() pageSize = 4;

    factures$!: Observable<Facture[]>;
    total$!: Observable<number>;
    sortedColumn!: string;
    sortedDirection!: string;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public factureService: FactureService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.factureService.pageSize = this.pageSize;
        this.factures$ = this.factureService.factures$;
        this.total$ = this.factureService.total$;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.factureService.sortColumn = column;
        this.factureService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }
}
