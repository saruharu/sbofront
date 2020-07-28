import { ChequeService } from './cheque.service';
import { TypepaiementService } from './typepaiement.service';
import { FournisseurService } from './fournisseur.service';
import { SocieteService } from './societe.service';
import { UserlbvService } from './userlbv.service';
import { BanqueService } from './banque.service';
import { FactureAgService } from './facture-ag.service';
import { StatutCServiceService } from './statut-c-service.service';
import { StatutFService } from './statut-f.service';


export const services = [ StatutFService, StatutCServiceService, FactureAgService, ChequeService, TypepaiementService, FournisseurService, SocieteService, UserlbvService, BanqueService];

export * from './cheque.service';
export * from './typepaiement.service';
export * from './fournisseur.service';
export * from './facture-ag.service';
export * from './societe.service';
export * from './userlbv.service';
export * from './banque.service';
export * from './facture-ag.service';
export * from './statut-c-service.service';
export * from './statut-f.service';








