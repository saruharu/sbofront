import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FournisseurService, ChequeService, FactureAgService, StatutCServiceService, StatutFService } from '@modules/cheque/services';
import { Fournisseur,Cheque, FactureAgresso } from '@modules/cheque/models';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './paiementValider.component.html',
    styleUrls: ['paiementValider.component.scss'],
})
export class PaiementValiderComponent implements OnInit {
    frsSaisi: Fournisseur
    public isValid: boolean;
    public chequeSaisi: any;
    public savedCheque: any;
    public factAgsCochees: any[];
    public sumFactCochees: number;
    public ecart: number;
    public nbreFactCochees: number; // <-- stub, real value : this.factAgsCochees.length;

    public isAdmin = true;

    constructor(private frsService: FournisseurService,
                private chequeService: ChequeService,
                private factagService: FactureAgService,
                private statutCService: StatutCServiceService,
                private statutFService: StatutFService,
                private router:Router
                ) {}
    ngOnInit() {


        //Recuperer Cheque de PaiementCheque depuis service
        this.chequeSaisi = this.chequeService.data;
        console.log("Cheque Saisi", this.chequeSaisi);

        //Recuperer FactChecked de PaiementCocher depuis service
        this.factAgsCochees = this.factagService.facturesChecked;
        this.sumFactCochees = this.factagService.sum;
        this.ecart = this.factagService.ecart;
        this.nbreFactCochees=this.factAgsCochees.length;
        //TO DO : uncomment the next two lines to "unstub the process"
        //this.sumFactCochees = this.factagService.sum;
        //this.ecart = this.factagService.ecart;
        console.log("factAgsCochees", this.factAgsCochees);
        
        //enable/disable button 'Valider'
        //this.Valid(this.ecart,100);
    }

    onValidCheque(){

        //set cheque status = validated
        //save cheque
        
        this.statutCService.getStatut(1)
        .subscribe(res=>{
            this.chequeSaisi.statut=res;

            
        this.chequeService.saveResource(this.chequeService.host+"/listCheques",this.chequeSaisi)
        .subscribe(res=>{
            this.savedCheque=res;
            console.log("testest");
            

            for(let index in this.factAgsCochees){
                this.statutFService.getStatut(1)
                .subscribe(res=>{
                    this.factAgsCochees[index].statut=res;
                    console.log("statut facture",this.factAgsCochees[index].statut);

                console.log("this.savedCheque.idCheque",this.savedCheque);
                        this.factagService.updateResourceStatutValid(this.factAgsCochees[index].idFactAg, this.savedCheque)
                        .subscribe(res=>{
                            
                            this.factAgsCochees[index]=res;
                            console.log(this.factAgsCochees[index]);
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
            
        },err=>{
            console.log(err);
        })
            this.Redirect();
    }
    
    Valid(ecart: number, seuil: number){
        if((ecart>=0 && ecart<seuil) || (ecart<=0 && ecart>-seuil)) this.isValid = true;
        if(ecart>100 || ecart<-seuil) this.isValid =  false;
        return this.isValid;

    }

    onWait(){


        
        //set cheque status = validated
        //save cheque
        
        this.statutCService.getStatut(2)
        .subscribe(res=>{
            this.chequeSaisi.statut=res;

            
        this.chequeService.saveResource(this.chequeService.host+"/listCheques",this.chequeSaisi)
        .subscribe(res=>{
            this.savedCheque=res;
            console.log("testest");
            

            for(let index in this.factAgsCochees){
                
        
                console.log("this.savedCheque.idCheque",this.savedCheque);
                        this.factagService.updateResourceStatutWait(this.factAgsCochees[index].idFactAg,  this.savedCheque)
                        .subscribe(res=>{
                            
                            this.factAgsCochees[index]=res;
                            console.log(this.factAgsCochees[index]);
                            },err=>{
                              console.log(err);
                            });
                        }
                    },err=>{
                        console.log(err);
                    });
                },err=>{
                    console.log(err);
                })

            console.log("saved after",this.savedCheque);


        //this.router.navigate(['/cheque/paiementCheque']); 



        //cheque status = onhold
        //this.chequeService.onWaitList.push(this.chequeSaisi);
        //this.router.navigate(['/cheque/paiementCheque']);  
        this.Redirect();

        //PARTIE ADMIN: rejeter button ==> cheque status= rejected
        //AAAAND factures.cheque = N   U    L   L
        /*        for(let index in this.factAgsCochees){
                    this.factAgsCochees[index].cheque = null;
                    this.factagService.updateResource(this.chequeSaisi,this.factAgsCochees[index].idFactAg)
                    .subscribe(res=>{
                        this.factAgsCochees[index]=res;
                        console.log(this.factAgsCochees[index]);
                        },err=>{
                          console.log(err);
                        });
                }
                
        */
    }
    
     
    Redirect(){
        this.router.navigate(['/cheque/paiementCheque']);  
        }

}
