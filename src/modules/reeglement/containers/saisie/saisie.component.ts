import { Component, OnInit } from '@angular/core';
import { Societe, Fournisseur, TypeReglement, Banque} from '@modules/reeglement/models';
import { TypereglementService, FournisseurService, SocieteService, BanqueService } from '@modules/reeglement/services';


import { formatDate } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { EventEmitter } from 'events';

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
        for(let index in this.reglementsOnHold)
    this.Valider(this.reglementsOnHold[index]);
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





  onHold(data){


    // Recuperer les objets depuis leurs attributs selectionnes (lib, id...)      
    this.reglementsOnHold.push(data.value);

    //Fournisseur
    this.fournisseurService.getFournisseur(data.value.cnuf)
    .subscribe(res=>{
        data.value.fournisseur= res;
    //this.currentFacture=res;
    //Societe
    this.societeService.getSocieteByLibelle(this.selectedSociete)
    .subscribe(res=>{
        data.value.societe=res;
        //TypeDoc
        this.typereglementService.getTypereglementByLibelle(this.selectedType)
        .subscribe(res=>{
            data.value.typesreglement=res;
            //User
            
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
    console.log(data.value);
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
this.typereglementService.getTypeReglements()
.subscribe(data=>{
          this.typesReglement=data;
      },err=>{
          console.log(err);
      })  
this.banqueService.getBanques()
.subscribe(data=>{
           this.banques=data;
        },err=>{
            console.log(err);
        })
    }





}