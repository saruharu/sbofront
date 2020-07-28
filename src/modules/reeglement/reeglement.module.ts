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
import * as reeglementComponents from './components';

/* Containers */
import * as reeglementContainers from './containers';

/* Guards */
import * as reeglementGuards from './guards';

/* Services */
import * as reeglementServices from './services';
import { RechercheComponent } from './containers/recherche/recherche.component';
import { SaisieComponent } from './containers/saisie/saisie.component';
import { SaisieAutoComponent } from './containers/saisie-auto/saisie-auto.component';

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
    providers: [...reeglementServices.services, ...reeglementGuards.guards],
    declarations: [...reeglementContainers.containers, ...reeglementComponents.components, RechercheComponent, SaisieComponent, SaisieAutoComponent],
    exports: [...reeglementContainers.containers, ...reeglementComponents.components],
})
export class ReeglementModule {}
