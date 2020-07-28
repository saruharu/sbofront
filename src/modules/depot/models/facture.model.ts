import { Fournisseur } from './fournisseur.model';
import { Societe } from './societe.model';
import { Userlbv } from './userlbv.model';
import { TypeDoc } from './typedoc.model';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgModule, LOCALE_ID } from '@angular/core';
import { StatutFacture } from '@modules/depot/models';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
    imports : [],
    providers: [ { provide: LOCALE_ID, useValue: "fr-FR" }]
    //Your code
})
export class Facture{
    public idFac: number;
    public montant: number;
    public numFact?: String;
    public dateDepot: Date;
    public dateFact: Date;
    public dateRemise: Date;
    public joursEcheance: number;
    public userlbv?: Userlbv;
    public societe?: Societe;
    public fournisseur?: Fournisseur;
    public typedoc?: TypeDoc;
    public statut?: StatutFacture;
	
}