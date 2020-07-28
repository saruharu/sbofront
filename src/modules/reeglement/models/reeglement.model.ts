import { Fournisseur } from './fournisseur.model';
import { Societe } from './societe.model';
import { TypeReglement } from './typereglement.model';
import { Banque } from './banque.model';
import { Facture } from 'modules/depot/models';

export class Cheque{
    public idReglement: number;
    public dateDepot: Date;
    public dateCheque: Date;
    public montant: number;
    public facts: Facture[];
    public societe: Societe;
    public fournisseur: Fournisseur;
    public typereglement: TypeReglement;
    public banque: Banque;
}