import { Component, OnInit } from '@angular/core';
import { Societe, Fournisseur, TypeReglement, Banque} from '@modules/reeglement/models';
import { TypereglementService, FournisseurService, SocieteService, BanqueService } from '@modules/reeglement/services';



import { Router } from '@angular/router';
import { Reglement } from '@modules/tables/models';

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
    //libelleFrs=this.setLibFrs();


  constructor(
    private typereglementService:TypereglementService,
        private fournisseurService:FournisseurService,
        private societeService:SocieteService,
        private banqueService: BanqueService,
        private router:Router
  ) {
    this.LoadData();
   }

  ngOnInit(): void {
  }
  


  onSaveFacture(data){

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
  /*
  this.factureService.saveResource(this.factureService.host+"/listFactures",data)
  .subscribe(res=>{
      this.formatJsonData(data);
      this.currentFacture=res;
      this.mode=2;
  },err=>{
      console.log(err);
  });
  this.Redirect();
  */
}



  onHold(r){

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
        //Typereglement
        this.typereglementService.getTypereglementByLibelle(this.selectedType)
        .subscribe(res=>{
            r.value.typesreglement=res;
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
}
