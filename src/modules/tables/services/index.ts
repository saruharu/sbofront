import { CountryService } from './country.service';
import { TablesService } from './tables.service';
import { FactureService } from './facture.service';
import { ChequeService } from './cheque.service';

export const services = [TablesService, FactureService, CountryService, ChequeService];

export * from './tables.service';
export * from './country.service';
export * from './facture.service';
export * from './cheque.service';
