import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'ACCUEIL',
        items: ['dashboard'],
    },
    {
        text: 'SERVICES',
        items: ['depot', 'cheque', 'reeglement', 'reception'],
    },
    {
        text: 'DETAILS',
        items: ['charts', 'tables'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Tableau de bord',
        link: '/dashboard',
    },

    depot: {
        icon: 'book-open',
        text: 'Dépôt des factures',
        submenu: [
            {
                text: 'Saisie des factures',
                link: '/depot/addFacture',
            },
            {
                text: 'Edition des factures',
                link: '/depot/findFacture',
            },
        ],
    },
    cheque: {
        icon: 'book-open',
        text: 'Paiement de la marge Arrière',
        submenu: [
            {
                text: 'Paiement de la Marge Arrière',
                link: '/cheque/paiementCheque',
            },
            {
                text: 'Recherche de chèques',
                link: '/cheque/recherche',
            },
        ],
    },

    reeglement: {
        icon: 'book-open',
        text: 'Règlement des fournisseurs',
        submenu: [
            {
                text: 'Saisie automatique des règlements',
                link: '/reeglement/saisieAuto',
            },
            {
                text: 'Saisie des règlements',
                link: '/reeglement/saisie',
            },
            {
                text: 'Recherche des règlements',
                link: '/reeglement/recherche',
            },
        ],
    },

    reception: {
        icon: 'book-open',
        text: 'Réception',
        submenu: [
            {
                text: 'Suivi des réceptions',
                link: '/reception/suivi',
            },
            {
                text: 'Recherche de reçus',
                link: '/reception/recherche',
            },
        ],
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
    },
};
