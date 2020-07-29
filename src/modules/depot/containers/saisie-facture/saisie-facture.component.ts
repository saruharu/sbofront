import { ChangeDetectionStrategy, Component, OnInit, Input, Type } from '@angular/core';
import { Facture, Societe, Fournisseur, TypeDoc, Userlbv } from '@modules/depot/models';
import { FactureService, TypedocService, FournisseurService, SocieteService, UserlbvService } from '@modules/depot/services';


import { Router } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgModule, LOCALE_ID } from '@angular/core';






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
    public factureTest: Facture;
    public facturesOnHold: any[]=[];

    public selectedType;
    public selectedSociete;
    public selectedUser;

    public currentFournisseur: Fournisseur;
    public currentFacture: Facture;
    public mode: number=1;
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

    datee = new Date();
    constructor(
        private factureService:FactureService,
        private typedocService:TypedocService,
        private fournisseurService:FournisseurService,
        private societeService:SocieteService,
        private userlbvService:UserlbvService,
        private router:Router)
        {


        //Charger les data dans les listes roulantes
        this.LoadData();

    }

    LoadData(){
        //Charger les frs dans la liste roulante        
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
        //Date en francais configuration ( . . . in construction. . . )
            console.log("blabla");
            console.log("hui")
            this.factureTest = new Facture();
            console.log(new Date().toLocaleDateString("en-Fr"));
            this.factureTest.dateDepot = new Date();
            console.log("hui1")
            console.log(this.factureTest.dateDepot.toLocaleDateString());
    }

    //Afficher LibFrs et echeance apres cnuf saisi
    onSearchChange(value) {  
        console.log("cnuf");
        console.log(value);
        this.getFrs(value);
      }

    getFrs(cnuf: number) {

       this.fournisseurService.getFournisseur(cnuf)
        .subscribe(res=>{
            console.log("peasant");
            console.log(res);
            this.frs = res;
            this.userlbvService.getUlbvByHref(this.frs["_links"].userlbv.href)
            .subscribe(res=>{
                this.user = res;
                this.nomComplet = this.user.nomUlbv+" "+ this.user.prenomUlbv;
                console.log("util"+this.user.nomUlbv);
            },err=>{
                console.log(err);
            })
        },err=>{
            console.log(err);
        });
        this.frs.libelleFrs = null;
        this.frs.echeanceFrs = null;
        this.nomComplet = null;


    }

    isFrs(): boolean{
        if(this.frs !(null)) { return true;}
        else {return false;}
    }


    onSaveFacture(){

                    if(this.facturesOnHold!=null) {
                        for(let index in this.facturesOnHold)
                    this.Valider(this.facturesOnHold[index]);
                    }
                    
                   


                
    console.log("tamaman");
    console.log(this.facturesOnHold);
    
    //data.reset();
    //data.numFact.setErrors(null);
    }
  
     
    onHold(f){


        // Recuperer les objets depuis leurs attributs selectionnes (lib, id...)      
        this.facturesOnHold.push(f.value);

        //Fournisseur
        this.fournisseurService.getFournisseur(f.value.cnuf)
        .subscribe(res=>{
            f.value.fournisseur= res;
        //this.currentFacture=res;
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


/*
        this.RetrieveDataJson(data.value);
        this.formatJsonData(data.value);

*/



        console.log("data.value");
        console.log(f.value);
        console.log("onHold");
        console.log(this.facturesOnHold);
        /*

            var resetButton = (data.value.numFact);
            resetButton.value='';
            console.log("reset", resetButton.value);
    */
   //f.controls['montant'].reset();

    }


    Valider(data){
        this.factureService.saveResource(this.factureService.host+"/listFactures",data)
        .subscribe(res=>{
            this.formatJsonData(data);
            this.currentFacture=res;
            this.mode=2;
        },err=>{
            console.log(err);
        });
        this.Redirect();
    }




    RetrieveDataJson(data){

                // Recuperer les objets depuis leurs attributs selectionnes (lib, id...)      

        //Fournisseur
        this.fournisseurService.getFournisseur(data.cnuf)
        .subscribe(res=>{
            data.fournisseur= res;
        //this.currentFacture=res;
        },err=>{
        console.log(err);
        });

        //Societe
        this.societeService.getSocieteByLibelle(this.selectedSociete)
        .subscribe(res=>{
            data.societe=res;
        },err=>{
            console.log(err);
        });

        //TypeDoc
        this.typedocService.getTypedocByLibelle(this.selectedType)
        .subscribe(res=>{
            data.typedoc=res;
        },err=>{
            console.log(err);
        });


        //User
        this.SplitNames();
        this.userlbvService.getUserlbvByNoms(this.selectedNom,this.selectedPrenom)
        .subscribe(res=>{
            data.userlbv=res;
        },err=>{
            console.log(err);
        });

 
}

formatJsonData(data){
 //Formatage data en facture
 data= {
     numFact: data.numFact,
     montant: data.montant,
     joursEcheance: data.joursEcheance,
     dateDepot: Date.parse(data.dateDepot),
     fournisseur:{
         cnuf: data.fournisseur.cnuf,
         libelleFrs: data.fournisseur.libelleFrs,
         echeanceFrs: data.fournisseur.echeanceFrs
     },
     
     societe:{
         idSociete: data.societe.idSociete,
         libelleSociete: this.selectedSociete,
     },
     typedoc:{
         idTypedoc: data.typedoc.idTypedoc,
         libelleTypedoc: this.selectedType,
     },
     userlbv:{
         idUlbv: data.userlbv.idUlbv,
         nomUlbv: data.userlbv.nomUlbv,
         prenomUlbv: data.userlbv.prenomUlbv,
     }
     
 };

}

selectChangeHandlerS(event: any){
    this.selectedSociete=event.target.value;
}
selectChangeHandlerT(event: any){
    this.selectedType=event.target.value;

}
selectChangeHandlerU(event: any){
    this.selectedUser=event.target.value;
}

SplitNames(){
    this.splitUlbv=this.nomComplet.split(" ");
    this.selectedNom = this.splitUlbv[0];
    this.selectedPrenom = this.splitUlbv[1];
}

Redirect(){
    this.router.navigate(['/depot/addFacture']);  
    }

onNewFacture(){
    this.mode=1;
}

onDeleteFacture(id){
    let conf=confirm("Etes-vous sûr(e)");
    if(conf){
        this.facturesOnHold.splice(id,1);
        console.log("hereeee"+this.facturesOnHold);
        }
    }
    updateList(id: number, property: string, event: any) {
        const editField = event.target.textContent;
        this.facturesOnHold[id][property] = editField;
      }
}

