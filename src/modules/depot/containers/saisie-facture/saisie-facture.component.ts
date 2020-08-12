import { ChangeDetectionStrategy, Component, OnInit, Input, Type } from '@angular/core';
import { Facture, Societe, Fournisseur, TypeDoc, Userlbv } from '@modules/depot/models';
import { FactureService, TypedocService, FournisseurService, SocieteService, UserlbvService } from '@modules/depot/services';


import { Router } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppCommonService } from '@common/services';


// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './saisie-facture.component.html',
    styleUrls: ['saisie-facture.component.scss'],
})
@NgModule({
    imports : [],
    providers: [ { provide: LOCALE_ID, useValue: "fr-FR" }]
    //Your code
})
export class SaisieFactureComponent implements OnInit {

    public typesDoc:any;
    public fournisseurs:any;
    public societes:any;
    public userlbvs:any;
    public facturesOnHold: any[]=[];

    public selectedType;
    public selectedSociete;
    public selectedUser;

    public currentFournisseur: Fournisseur;
    public currentFacture: Facture;
    public currentSociete: Societe;
    splitUlbv: any;
    selectedPrenom: any;
    selectedNom: any;
    cnuf: any;
    frs: any;
    user: any;
    nomComplet : any;
    //libelleFrs=this.setLibFrs();
    echeanceFrs: any;

    datee: any;
    constructor(
        private factureService:FactureService,
        private typedocService:TypedocService,
        private fournisseurService:FournisseurService,
        private societeService:SocieteService,
        private userlbvService:UserlbvService,
        private router:Router,
        private appcommonService: AppCommonService)
        {


        this.datee = this.appcommonService.date;
        //Charger les data dans les listes roulantes
        this.LoadData();

    }
    
    
    //Charger les donnees dans les liste roulantes        
    LoadData(){
        this.typedocService.getTypesDoc()
        .subscribe(data=>{
                  this.typesDoc=data;
              },err=>{
                  console.log(err);
              });
        
        this.fournisseurService.getFournisseurs()
        .subscribe(data=>{
                  this.fournisseurs=data;
              },err=>{
                  console.log(err);
              });
        
        this.societeService.getSocietes()
        .subscribe(data=>{
                  this.societes=data;
              },err=>{
                  console.log(err);
              })   
        this.userlbvService.getUserlbvs()
        .subscribe(data=>{
                  this.userlbvs=data;
              },err=>{
                  console.log(err);
              })      
            }
          
    ngOnInit(): void {
    }

    //Evenement: apres la saisie du cnuf
    onSearchChange(value) {  
        console.log("cnuf");
        console.log(value);
        this.getFrs(value);
      }

    //Recuperer le fournisseur et ses attributs selon le cnuf saisi
    getFrs(cnuf: number) {

       this.fournisseurService.getFournisseur(cnuf)
        .subscribe(res=>{
            this.frs = res;
            this.userlbvService.getUlbvByHref(this.frs["_links"].userlbv.href)
            .subscribe(res=>{
                this.user = res;
                this.nomComplet = this.user.nomUlbv+" "+ this.user.prenomUlbv;
                console.log("utilisateur"+this.user.nomUlbv);
            },err=>{
                console.log(err);
            })
        },err=>{
            console.log(err);
        });

        //IMPORTANT pour reinitialiser les champs si le cnuf est saisi un autre fois
        this.frs.libelleFrs = null;
        this.frs.echeanceFrs = null;
        this.nomComplet = null;


    }

    //Evenement clique du bouton Ajouter
    onHold(f){

        const options = { year: "numeric", month: "numeric", day: "numeric" };
        this.datee = this.appcommonService.date.toLocaleDateString('fr-FR', options);
        f.value.dateFact =  this.datee;
        f.value.dateDepot =  this.datee;
        console.log("dateservice"+this.datee);

        console.log("datedepot"+f.value.dateDepot);

        //facture ajouter a la liste des factures a afficher dans le tableau
        this.facturesOnHold.push(f.value);

        // Recuperer les objets depuis leurs attributs selectionnes (lib, id...)      
        //Fournisseur
        this.fournisseurService.getFournisseur(f.value.cnuf)
        .subscribe(res=>{
            f.value.fournisseur= res;
            
            //Societe
            this.societeService.getSocieteByLibelle(this.selectedSociete)
                .subscribe(res=>{
                f.value.societe=res;

                //TypeDoc
                this.typedocService.getTypedocByLibelle(this.selectedType)
                .subscribe(res=>{
                    f.value.typedoc=res;

                    //User
                    this.SplitNames();
                    this.userlbvService.getUserlbvByNoms(this.selectedNom,this.selectedPrenom)
                    .subscribe(res=>{
                        f.value.userlbv=res;

                    },err=>{
                        console.log(err);
                    });
                },err=>{
                    console.log(err);
                });
            },err=>{
                console.log(err);
            });

        },err=>{
            console.log(err);
        });
    }

    //Evenement clique du bouton Valider
    onSaveFacture(){
        if(this.facturesOnHold!=null) {
            for(let index in this.facturesOnHold){
                this.Valider(this.facturesOnHold[index]);
            }
        }
    }
  
    
    Valider(data){
        this.factureService.saveResource(this.factureService.host+"/listFactures",data)
        .subscribe(res=>{
            this.facturesOnHold.push(res);
        },err=>{
            console.log(err);
        });
        this.Redirect();
    }

    //Evenements des listes roulantes
    selectChangeHandlerS(event: any){
        this.selectedSociete=event.target.value;
    }
    selectChangeHandlerT(event: any){
        this.selectedType=event.target.value;

    }
    selectChangeHandlerU(event: any){
        this.selectedUser=event.target.value;
    }

    //Separation du nom et prenom de l'utiisateur
    SplitNames(){
        this.splitUlbv=this.nomComplet.split(" ");
        this.selectedNom = this.splitUlbv[0];
        this.selectedPrenom = this.splitUlbv[1];
    }

    //redirection vers une autre page
    Redirect(){
        this.router.navigate(['/depot/addFacture']);  
    }
    
    //Supprimer et modifier dans le tableau
    onDeleteFacture(id){
        let conf=confirm("Etes-vous sûr(e)?");
        if(conf){
            this.facturesOnHold.splice(id,1);
        }
    }
    
    updateList(id: number, property: string, event: any) {
        const editField = event.target.textContent;
        this.facturesOnHold[id][property] = editField;
    }

}

