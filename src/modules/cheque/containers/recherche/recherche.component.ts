import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChequeService, BanqueService, FactureAgService } from '@modules/cheque/services';
import { TypepaiementService } from '@modules/cheque/services';
import { FournisseurService, SocieteService, UserlbvService } from '@modules/cheque/services';
import { Router } from '@angular/router';
import { Fournisseur } from '@modules/depot/models';
import { empty } from 'rxjs';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './recherche.component.html',
    styleUrls: ['recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
    public isAdmin = true;

    currentCnuf: number;
    currentnumcheque: number;
    currentFournisseur: Fournisseur;
    public chequeList: any;
    currentLibF: string;
    numFactsList: string = " ";
    montantFactsSum: number = 0;
    currentFactAg: any;
    currentNumFactAg: string;
    constructor(      
        private chequeService:ChequeService,
        private typepaiementService:TypepaiementService,
        private fournisseurService:FournisseurService,
        private societeService:SocieteService,
        private userlbvService:UserlbvService,
        private banqueService:BanqueService,
        private factAgService:FactureAgService,
        private router:Router) {}
    ngOnInit() {}

    onChercher(data){
    console.log(data);

    //Convertir en Objet
    if((data.cnuf!=null)||(data.cnuf!=undefined)){
    this.fournisseurService.findById(data.cnuf)
    .subscribe(res=>{
        data.fournisseur=res;
    },err=>{
        console.log(err);
    });
}

    if((data.libelleFrs!=null)||(data.libelleFrs!=undefined)){
    this.fournisseurService.getFournisseurByLibelle(data.libelleFrs)
    .subscribe(res=>{
        data.fournisseur=res;
    },err=>{
        console.log(err);
    });

}

if((data.fournisseur!=null)||(data.fournisseur!=undefined)){
    this.currentFournisseur = data.fournisseur;
    console.log("currentfrs", this.currentFournisseur);
    this.currentCnuf=this.currentFournisseur.cnuf;
    this.currentLibF = this.currentFournisseur.libelleFrs;
    console.log("currentcnuf", this.currentCnuf);
    console.log("currentlibf", this.currentLibF);
  }

/*
    if((data.numFactAg!=null)||(data.numFactAg!=undefined)){
        this.factAgService.getFactAgByNum(data.numFactAg)
        .subscribe(res=>{
            data.factAgs=res;
        },err=>{
            console.log(err);
        });
}
*/

    //Forcer le type cheque
      console.log("data lwla");
      console.log(data);


/*
      if((data.factAgs!=empty)||(data.factAgs!=undefined)){
        this.currentFactAg = data.factAgs;
        
        this.currentNumFactAg = this.currentFactAg.numFactAg;
        console.log("currentFactAg", this.currentFactAg);
        console.log("currentNumFactAg", this.currentNumFactAg);
   
         }
  
         */

      this.currentnumcheque=data.numCheque;

    //backend recherche
    this.chercherCheques();
    
  
  }

  
    chercherCheques(){

        console.log("before");
        console.log(this.chequeList);

        //Trouver les cheques
        this.chequeService.getChequesByCriteria(this.currentnumcheque,this.currentCnuf, 
            this.currentLibF)
        .subscribe(data=>{
                  this.chequeList=data["_embedded"].cheques;
                  console.log("haha",this.chequeList);
                  //return object attributes 
                     
        for(let index in this.chequeList){
            this.societeService.getSocieteByHref(this.chequeList[index]._links.societe.href)
            .subscribe(res=>{
                this.chequeList[index].societe=res;
                this.userlbvService.getUlbvByHref(this.chequeList[index]._links.userlbv.href)
                .subscribe(res=>{
                    this.chequeList[index].userlbv=res;

                    this.fournisseurService.getFournisseurByHref(this.chequeList[index]._links.fournisseur.href)
                    .subscribe(res=>{
                        this.chequeList[index].fournisseur=res;

                        this.typepaiementService.getTypeByHref(this.chequeList[index]._links.typepaiement.href)
                        .subscribe(res=>{
                            this.chequeList[index].typedoc=res;

            
                            this.banqueService.getBanqueByHref(this.chequeList[index]._links.banque.href)
                            .subscribe(res=>{
                                this.chequeList[index].banque=res;


                                this.factAgService.getFactAgsByHref(this.chequeList[index]._links.factAgs.href)
                                .subscribe(res=>{
                                    this.chequeList[index].factAgs=res["_embedded"].factureAgressoes;
                                    for (let j = 0; j < this.chequeList[index].factAgs.length; j++){
                                        this.numFactsList+= this.chequeList[index].factAgs[j].numFactAg +" ; ";
                                        this.montantFactsSum +=this.chequeList[index].factAgs[j].montant
                                    }
                                        console.log('montant is',this.montantFactsSum);
                                        console.log("nums are:",this.numFactsList);
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

                    },err=>{
                        console.log(err);
                    });
                },err=>{
                    console.log(err);
                });
            }
              },err=>{
                  console.log(err);
              });




    }

    onDeleteCheque(c){
        let conf=confirm("Etes-vous sûr(e)");
        if(conf){
          this.chequeService.deleteSource(c._links.self.href)
            .subscribe(data=>{
              this.onChercher(data);

            },err=>{
              console.log(err);
            })
        }
      }

      onUpdateCheque(c){
        let conf=confirm("Etes-vous sûr(e)");
        if(conf){
          this.chequeService.updateResource(c._links.self.href,c)
            .subscribe(data=>{
              this.chercherCheques();
            },err=>{
              console.log(err);
            })
        }
      }

    
    dataHref(chequeList: any){
                
        for(let index in chequeList){
            this.societeService.getSocieteByHref(chequeList[index]._links.societe.href)
            .subscribe(res=>{
                chequeList[index].societe=res;
                this.userlbvService.getUlbvByHref(chequeList[index]._links.userlbv.href)
                .subscribe(res=>{
                    chequeList[index].userlbv=res;

                    this.fournisseurService.getFournisseurByHref(chequeList[index]._links.fournisseur.href)
                    .subscribe(res=>{
                        chequeList[index].fournisseur=res;
            

                        this.typepaiementService.getTypeByHref(chequeList[index]._links.typepaiement.href)
                        .subscribe(res=>{
                            chequeList[index].typedoc=res;

            
                            this.banqueService.getBanqueByHref(chequeList[index]._links.banque.href)
                            .subscribe(res=>{
                                chequeList[index].banque=res;


                                this.factAgService.getFactAgsByHref(chequeList[index]._links.factAgs.href)
                                .subscribe(res=>{
                                    chequeList[index].factAgs=res["_embedded"].factureAgressoes;
                                    for (let j = 0; j < chequeList[index].factAgs.length; j++){
                                        this.numFactsList+= chequeList[index].factAgs[j].numFactAg +" ; ";
                                        this.montantFactsSum +=chequeList[index].factAgs[j].montant
                                    }
                                        console.log('montant is',this.montantFactsSum);
                                        console.log("nums are:",this.numFactsList);
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

                    },err=>{
                        console.log(err);
                    });
                },err=>{
                    console.log(err);
                });
            }
        }
    }