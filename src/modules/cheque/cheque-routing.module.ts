/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { ChequeModule } from './cheque.module';

/* Containers */
import * as chequeContainers from './containers';

/* Guards */
import * as chequeGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'recherche',
        data: {
            title: 'Recherche de chèques - SBO2',
            breadcrumbs: [
                {
                    text: 'Paiement de la marge arrière',
                    link: '/cheque',
                },
                {
                    text: 'Recherche de chèques',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: chequeContainers.RechercheComponent,
    },
    {
        path: 'paiementCheque',
        data: {
            title: 'Paiement de la Marge Arrière - SBO2',
            breadcrumbs: [
                {
                    text: 'Paiement de la marge arrière',
                    link: '/cheque',
                },
                {
                    text: 'Paiement de la Marge Arrière',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: chequeContainers.PaiementChequeComponent,
    },
    {
        path: 'paiementCocher',
        data: {
            title: 'Paiement de la Marge Arrière - SBO2',
            breadcrumbs: [
                {
                    text: 'Paiement de la marge arrière',
                    link: '/cheque',
                },
                {
                    text: 'Sélection des factures',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: chequeContainers.PaiementCocherComponent,
    },
    {
        path: 'paiementValider',
        data: {
            title: 'Paiement de la Marge Arrière - SBO2',
            breadcrumbs: [
                {
                    text: 'Paiement de la marge arrière',
                    link: '/cheque',
                },
                {
                    text: 'Validation du paiement',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: chequeContainers.PaiementValiderComponent,
    },
];

@NgModule({
    imports: [ChequeModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ChequeRoutingModule {}
