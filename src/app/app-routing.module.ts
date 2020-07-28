import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/dashboard',},
    {path: 'charts',loadChildren: () => import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),},
    {path: 'dashboard',loadChildren: () =>import('modules/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),},
    {path: 'auth',loadChildren: () =>import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),},
    {path: 'error',loadChildren: () =>import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),},
    {path: 'tables',loadChildren: () =>import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),},
    {path: 'version',loadChildren: () =>import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),},
    {path: 'depot',loadChildren: () =>import('modules/depot/depot-routing.module').then(m => m.DepotRoutingModule),},
    {path: 'cheque',loadChildren: () =>import('modules/cheque/cheque-routing.module').then(m => m.ChequeRoutingModule),},  
    {path: 'reception',loadChildren: () =>import('modules/reception/reception-routing.module').then(m => m.ReceptionRoutingModule),},  
    {path: 'reeglement',loadChildren: () =>import('modules/reeglement/reeglement-routing.module').then(m => m.ReeglementRoutingModule),},      
    {path: '**',pathMatch: 'full',loadChildren: () =>import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
