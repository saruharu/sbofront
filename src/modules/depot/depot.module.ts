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
import * as depotComponents from './components';

/* Containers */
import * as depotContainers from './containers';

/* Guards */
import * as depotGuards from './guards';

/* Services */
import * as depotServices from './services';

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
    providers: [...depotServices.services, ...depotGuards.guards],
    declarations: [...depotContainers.containers, ...depotComponents.components],
    exports: [...depotContainers.containers, ...depotComponents.components],
})
export class DepotModule {}
