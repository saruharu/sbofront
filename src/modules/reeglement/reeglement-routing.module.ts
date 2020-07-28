/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { ReeglementModule } from './reeglement.module';

/* Containers */
import * as reeglementContainers from './containers';

/* Guards */
import * as reeglementGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'recherche',
        data: {
            title: 'Recherche des règlements - SBO2',
            breadcrumbs: [
                {
                    text: 'Règlement des fournisseurs',
                    link: '/reeglement',
                },
                {
                    text: 'Recherche des documents',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: reeglementContainers.RechercheComponent,
    },
    {
        path: 'saisie',
        data: {
            title: 'Saisie des règlements - SBO2',
            breadcrumbs: [
                {
                    text: 'Règlement des fournisseurs',
                    link: '/reeglement',
                },
                {
                    text: 'Saisie des règlements',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: reeglementContainers.SaisieComponent,
    },
    {
        path: 'saisieAuto',
        data: {
            title: 'Saisie automatique des règlements - SBO2',
            breadcrumbs: [
                {
                    text: 'Règlement des fournisseurs',
                    link: '/reeglement',
                },
                {
                    text: 'Saisie automatique des règlements',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: reeglementContainers.SaisieAutoComponent,
    },
];

@NgModule({
    imports: [ReeglementModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ReeglementRoutingModule {}
