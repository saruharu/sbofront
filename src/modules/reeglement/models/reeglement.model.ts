import { Fournisseur } from './fournisseur.model';
import { Societe } from './societe.model';
import { TypeReglement } from './typereglement.model';
import { Banque } from './banque.model';
import { Facture } from 'modules/depot/models';

export class Reglement{
    public idReglement: number;
    public numCheque: string;
    public dateDepot: Date;
    public dateReglement: Date;
    public montant: number;
    public facts: Facture[];
    public societe: Societe;
    public fournisseur: Fournisseur;
    public typereglement: TypeReglement;
    public banque: Banque;
}


