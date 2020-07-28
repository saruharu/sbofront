/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { ReceptionModule } from './reception.module';

/* Containers */
import * as receptionContainers from './containers';

/* Guards */
import * as receptionGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'recherche',
        data: {
            title: 'Recherche de reçus - SBO2',
            breadcrumbs: [
                {
                    text: 'Réception',
                    link: '/reception',
                },
                {
                    text: 'Recherche de reçus',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: receptionContainers.RechercheComponent,
    },
    {
        path: 'suivi',
        data: {
            title: 'Suivi de réceptions - SBO2',
            breadcrumbs: [
                {
                    text: 'Réception',
                    link: '/reception',
                },
                {
                    text: 'Suivi de réceptions',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: receptionContainers.SuiviComponent,
    },
];

@NgModule({
    imports: [ReceptionModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ReceptionRoutingModule {}
