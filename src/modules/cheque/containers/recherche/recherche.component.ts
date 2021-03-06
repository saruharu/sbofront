import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChequeService, BanqueService, FactureAgService } from '@modules/cheque/services';
import { TypepaiementService } from '@modules/cheque/services';
import { FournisseurService, SocieteService } from '@modules/cheque/services';
import { Router } from '@angular/router';
import { Fournisseur } from '@modules/depot/models';
import * as XLSX from 'xlsx'; 

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './recherche.component.html',
    styleUrls: ['recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
    public isAdmin = true;
    public currentCnuf: number;
    public currentnumcheque: number;
    public currentFournisseur: Fournisseur;
    public chequeList: any;
    public currentLibF: string;
    public numFactsList: string = " ";
    public montantFactsSum: number = 0;
    public currentFactAg: any;
    public currentNumFactAg: string;
    constructor(      
        private chequeService:ChequeService,
        private typepaiementService:TypepaiementService,
        private fournisseurService:FournisseurService,
        private societeService:SocieteService,
        private banqueService:BanqueService,
        private factAgService:FactureAgService,
        private router:Router) {}

    ngOnInit() {}

    /*name of the excel-file which will be downloaded. */ 
    fileDate = new Date();
    fileName: string;  

    exportexcel(): void 
    {
        const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        this.fileName = 'Chèques-'+this.fileDate.toLocaleDateString('fr-FR', options)+'.xlsx'
        /* table id is passed over here */   
        let element = document.getElementById('excel-table'); 
        const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
        
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        
        /* save to file */
        XLSX.writeFile(wb, this.fileName);		
    }
    
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
        
        if((data.numFactAg!=null)||(data.numFactAg!=undefined)){
            this.factAgService.getFactAgByNum(data.numFactAg)
            .subscribe(res=>{
                data.factAgs=res["_embedded"].factureAgressoes[0];
            },err=>{
                console.log(err);
            });
        }
        
        if((data.factAgs!=null)||(data.factAgs!=undefined)){
            this.currentFactAg = data.factAgs;
            this.currentNumFactAg = this.currentFactAg.numFactAg;
            console.log("currentFactAg", this.currentFactAg);
            console.log("currentNumFactAg", this.currentNumFactAg);
         }
         
         this.currentnumcheque=data.numCheque;
         
         //backend recherche
         this.chercherCheques();
    
  
  }

  
    chercherCheques(){
        console.log("before");
        console.log(this.chequeList);
        //Trouver les cheques
        this.chequeService.getChequesByCriteria(this.currentnumcheque,this.currentCnuf, 
            this.currentLibF,this.currentNumFactAg)
            .subscribe(data=>{
                this.chequeList=data["_embedded"].cheques;
                console.log("haha",this.chequeList);
                //return object attributes 
                for(let index in this.chequeList){
                    this.societeService.getSocieteByHref(this.chequeList[index]._links.societe.href)
                    .subscribe(res=>{
                        this.chequeList[index].societe=res;
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
                                            this.montantFactsSum +=this.chequeList[index].factAgs[j].montant;
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
                }
                this.numFactsList= '';
                this.montantFactsSum=0;
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
            }
        }
    }