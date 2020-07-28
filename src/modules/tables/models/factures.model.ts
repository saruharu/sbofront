export interface Facture {
    [key: string]: string | number;
    id_facture: number;
    date_doc: string;
    frs: string;
    echeance: number;
    type_doc: string;
    cnuf: number;
    societe: string;
    user: string;
    montant: number;
}


