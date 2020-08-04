import { Component, OnInit } from '@angular/core';
import { Societe, Fournisseur, TypeReglement, Banque} from '@modules/reeglement/models';
import { TypereglementService, FournisseurService, SocieteService, BanqueService, ReglementService } from '@modules/reeglement/services';



import { Router } from '@angular/router';
import { Reglement } from '@modules/tables/models';
import { AppCommonService } from '@common/services';

@Component({
  selector: 'sb-saisie',
  templateUrl: './saisie.component.html',
  styleUrls: ['./saisie.component.scss']
})
export class SaisieComponent implements OnInit {

    public typesReglement:any;
    public fournisseurs:any;
    public societes:any;
    public banques:any;

    public selectedType;
    public selectedSociete;
    public selectedBanque;
    public reglementsOnHold: any[]=[];


    public currentFournisseur: Fournisseur;
    public mode: number=1;
    public currentSociete: Societe;
    splitUlbv: any;
    selectedPrenom: any;
    selectedNom: any;
    cnuf: any;
    frs: any;
    datee: any;
    currentReglement: Reglement;
    //libelleFrs=this.setLibFrs();


  constructor(        
        private reglementService:ReglementService,
        private typereglementService:TypereglementService,
        private fournisseurService:FournisseurService,
        private societeService:SocieteService,
        private banqueService: BanqueService,
        private router:Router,
        private appcommonService: AppCommonService
  ) {
    this.LoadData();
   }

  ngOnInit(): void {
  }
  


  onSaveReglement(data){

    if(this.reglementsOnHold!=null) {
        for(let index in this.reglementsOnHold){
            this.Valider(this.reglementsOnHold[index]);
        }
    }

    console.log("tamaman");
    console.log(data);

//data.reset();
//data.numFact.setErrors(null);
}




Valider(data){
  
  this.reglementService.saveResource(this.reglementService.host+"/listReglements",data)
  .subscribe(res=>{
      this.formatJsonData(data);
      this.currentReglement=res;
      this.mode=2;
  },err=>{
      console.log(err);
  });
  this.Redirect();
  
}

Redirect(){
    this.router.navigate(['/reeglement/saisie']);  
    }


  onHold(r){

    const options = { year: "numeric", month: "numeric", day: "numeric" };
    this.datee = this.appcommonService.date.toLocaleDateString('fr-FR', options);
    r.value.dateReglement =  this.datee;
    r.value.dateDepot =  this.datee;
    console.log("dateservice"+this.datee);

    
    // Recuperer les objets depuis leurs attributs selectionnes (lib, id...)      
    this.reglementsOnHold.push(r.value);
    console.log( "here",this.reglementsOnHold);

    //Fournisseur
    this.fournisseurService.getFournisseur(r.value.cnuf)
    .subscribe(res=>{
        r.value.fournisseur= res;
    },err=>{
        console.log(err);
    });
    //this.currentFacture=res;
    //Societe
    this.societeService.getSocieteByLibelle(this.selectedSociete)
    .subscribe(res=>{
        r.value.societe=res;
    },err=>{
        console.log(err);
    });

    this.banqueService.getBanqueByLibelle(this.selectedBanque)
    .subscribe(res=>{
        r.value.banque=res;
    },err=>{
        console.log(err);
    });
        //Typereglement
        this.typereglementService.getTypereglementByLibelle(this.selectedType)
        .subscribe(res=>{
            r.value.typereglement=res;
        },err=>{
            console.log(err);
        });


/*
    this.RetrieveDataJson(data.value);
    this.formatJsonData(data.value);

*/


    console.log("r.value");
    console.log(r.value);
    console.log("onHold");
    console.log(this.reglementsOnHold);
    /*

        var resetButton = (data.value.numFact);
        resetButton.value='';
        console.log("reset", resetButton.value);
*/

}



  //Afficher LibFrs et echenace apres cnuf saisi
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
    },err=>{
        console.log(err);
    });
    this.frs.libelleFrs = null;
    this.frs.echeanceFrs = null;


}

isFrs(): boolean{
    if(this.frs !(null)) { return true;}
    else {return false;}
}

  //Recuperer les select des listes roulantes
  selectChangeHandlerS(event: any){
    this.selectedSociete=event.target.value;
}
selectChangeHandlerT(event: any){
    this.selectedType=event.target.value;
}

selectChangeHandlerB(event: any){
    this.selectedBanque=event.target.value;
}
  LoadData(){
    //Charger les donnees dans la liste roulante


this.societeService.getSocietes()
.subscribe(data=>{
          this.societes=data;
        },err=>{
            console.log(err);
        });
this.banqueService.getBanques()
.subscribe(data=>{
    this.banques=data;
},err=>{
    console.log(err);
});
this.typereglementService.getTypeReglements()
.subscribe(data=>{
    this.typesReglement=data;
},err=>{
    console.log(err);
});


    }

    
onDeleteReglement(id){
    let conf=confirm("Etes-vous sûr(e)");
    if(conf){
        this.reglementsOnHold.splice(id,1);
        console.log("hereeee"+this.reglementsOnHold);
        }
    }
    formatJsonData(data){
        //Formatage data en facture
        data= {
            numCheque: data.numCheque,
            montant: data.montant,
            joursEcheance: data.joursEcheance,
            dateDepot: this.datee,
            dateReglement: this.datee,
            fournisseur:{
                cnuf: data.fournisseur.cnuf,
                libelleFrs: data.fournisseur.libelleFrs,
                echeanceFrs: data.fournisseur.echeanceFrs
            },
            societe:{
                idSociete: data.societe.idSociete,
                libelleSociete: this.selectedSociete,
            },
            banque:{
                idBanque: data.banque.idBanque,
                libelleBanque: this.selectedBanque,
            },
            typereglement:{
                idTypereglement: data.typereglement.idTypereglement,
                libelleTypereglement: this.selectedType,
            },       
        };
       
       }    
}
