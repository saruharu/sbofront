import { Fournisseur } from './fournisseur.model';
import { Societe } from './societe.model';
import { TypePaiement } from './typepaiement.model';
import { Banque } from './banque.model';
import { FactureAgresso } from './factureagresso.model';
import { StatutCheque } from './statutcheque.model';

export class Cheque{
    public idCheque: number;
    public numCheque: number;
    public dateDepot: Date;
    public dateCheque: Date;
    public montant: number;
    public factAgs: FactureAgresso[];
    public societe: Societe;
    public fournisseur: Fournisseur;
    public typepaiement: TypePaiement;
    public banque: Banque;
    public statut: StatutCheque;
}