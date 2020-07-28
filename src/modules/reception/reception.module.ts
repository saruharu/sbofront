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
import * as receptionComponents from './components';

/* Containers */
import * as receptionContainers from './containers';

/* Guards */
import * as receptionGuards from './guards';

/* Services */
import * as receptionServices from './services';
import { SuiviComponent } from './containers/suivi/suivi.component';
import { RechercheComponent } from './containers/recherche/recherche.component';

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
    providers: [...receptionServices.services, ...receptionGuards.guards],
    declarations: [...receptionContainers.containers, ...receptionComponents.components, SuiviComponent, RechercheComponent],
    exports: [...receptionContainers.containers, ...receptionComponents.components],
})
export class ReceptionModule {}
