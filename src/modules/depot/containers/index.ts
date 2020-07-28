import { RechercheFactureComponent } from './recherche-facture/recherche-facture.component';
import { SaisieFactureComponent } from './saisie-facture/saisie-facture.component';
import { FactureService } from '@modules/depot/services';

export const containers = [SaisieFactureComponent, RechercheFactureComponent];

export * from './recherche-facture/recherche-facture.component';
export * from './saisie-facture/saisie-facture.component';
