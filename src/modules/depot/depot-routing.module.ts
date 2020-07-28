/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DepotModule } from './depot.module';

/* Containers */
import * as depotContainers from './containers';

/* Guards */
import * as depotGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'findFacture',
        data: {
            title: 'Edition des factures - SBO2',
            breadcrumbs: [
                {
                    text: 'Dépôt des factures',
                    link: '/depot',
                },
                {
                    text: 'Edition des factures',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: depotContainers.RechercheFactureComponent,
    },
    {
        path: 'addFacture',
        data: {
            title: 'Saisie des factures - SBO2',
            breadcrumbs: [
                {
                    text: 'Dépôt des factures',
                    link: '/depot',
                },
                {
                    text: 'Saisie des factures',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: depotContainers.SaisieFactureComponent,
    },
];

@NgModule({
    imports: [DepotModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DepotRoutingModule {}
