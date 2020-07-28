/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { TablesModule } from '@modules/tables/tables.module';

/* Components */
import * as chequeComponents from './components';

/* Containers */
import * as chequeContainers from './containers';

/* Guards */
import * as chequeGuards from './guards';

/* Services */
import * as chequeServices from './services';
import { PaiementChequeComponent } from './containers';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule,
    ],
    providers: [...chequeServices.services, ...chequeGuards.guards, PaiementChequeComponent],
    declarations: [...chequeContainers.containers, ...chequeComponents.components],
    exports: [...chequeContainers.containers, ...chequeComponents.components],
})
export class ChequeModule {}
