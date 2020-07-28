export interface Cheque {
    [key: string]: string | number;
        n_doc: number;
        type_doc: string;
        date_doc: string;
        type_paiement: string;
        banque: string;
        cnuf: number,
        frs: string;
        societe: string;
        date_depot: string;
        user: string;
        montant: number;
    }

