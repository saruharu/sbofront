import { Fournisseur } from './fournisseur.model';
import { Societe } from './societe.model';
import { Userlbv } from './userlbv.model';
import { TypePaiement } from './typepaiement.model';
import { StatutFacture } from './statutfacture.model';
import { Cheque } from './cheque.model';

export class FactureAgresso{
    public idFactAg: number;
    public numFactAg: String;
    public dateFactAg: Date;
    public montant: number;
    public cheque: Cheque;
    public fournisseur: Fournisseur;
    public statut: StatutFacture;
}
