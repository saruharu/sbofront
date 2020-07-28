import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Cheque, FactureAgresso } from '@modules/cheque/models';
import { ChequeService, FournisseurService, FactureAgService } from '@modules/cheque/services';
import { Fournisseur } from '@modules/cheque/models';
import { Router } from '@angular/router';
import { trigger } from '@angular/animations';


@Component({
    selector: 'app-paiementCocher',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './paiementCocher.component.html',
    styleUrls: ['paiementCocher.component.scss'],
})
export class PaiementCocherComponent implements OnInit {
    
    isChecked: boolean;
    sum : number = 0;
    ecart: number ;

    constructor(
        private chequeService: ChequeService,
        private frsService: FournisseurService,
        private factAgService : FactureAgService,       
        private router:Router


        ) {}

    public chequeSaisi: any;
    public tempFrs: any;
    public factAg: any;
    public tempFour: any;
    public paid: boolean = true;
    public facturesChecked : FactureAgresso[]= [];
     //data: any;
    ngOnInit() {

        //Recuperer cheque du Service, venu de paiementCheque
        this.chequeSaisi = this.chequeService.data;
        this.ecart= this.chequeSaisi.montant;
        console.log("this is it");
        console.log("okay", this.chequeSaisi.libelleFrs);

        //Recuperer le fournisseur du cheque        
        this.frsService.getFournisseurByLibelle(this.chequeSaisi.libelleFrs)
        .subscribe(res=>{
            this.tempFrs= res;
            console.log("temp")
            console.log(this.tempFrs.cnuf);

            //Recuperer les factures Agresso ayant le meme fournisseur
            this.factAgService.getFactAgByCriteria(this.tempFrs.cnuf)
            .subscribe(res=>{
                this.factAg = res;
                console.log("factAg");
                console.log(this.factAg);

                this.dataHref(this.factAg);
                

                },err=>{
                    console.log(err);
                });

                
            },err=>{
            console.log(err);
        });

    }

    dataHref(factAg: any){
                
        for(let index in factAg["_embedded"].factureAgressoes){
            this.frsService.getFournisseurByHref(factAg["_embedded"].factureAgressoes[index]._links.fournisseur.href)
            .subscribe(res=>{

                factAg["_embedded"].factureAgressoes[index].fournisseur={cnuf: res.cnuf, libelleFrs:res.libelleFrs};
                console.log("tessst"+factAg["_embedded"].factureAgressoes[index].fournisseur);
            },err=>{
                console.log(err);
            });
        }
    }


    onSelect(event,selectedItem) {
        //event "check checkbox where id row = x"
        if ( event.target.checked) {
           console.log("item checked,item id: ", selectedItem.idFactAg);
           this.sum+= selectedItem.montant;
           this.ecart = this.chequeSaisi.montant - this.sum;

           //return factureag where id = x
            //this.facturesChecked = return
            this.facturesChecked.push(selectedItem);
            console.log("ids for now",this.facturesChecked);
            console.log("selected:",selectedItem);
       }

       if ( !event.target.checked) {
        console.log("item checked,item id: ", selectedItem.idFactAg);
        this.sum= this.sum -  selectedItem.montant;
        this.ecart = this.chequeSaisi.montant + this.sum;
        console.log("after change",this.sum);
        //return factureag where id = x
         //this.facturesChecked = return
         this.facturesChecked.splice(selectedItem.idFactAg,1);
         const filterInPlace = (array, predicate) => {
            let end = 0;
        
            for (let i = 0; i < array.length; i++) {
                const obj = array[i];
        
                if (predicate(obj)) {
                    array[end++] = obj;
                }
            }
        
            array.length = end;
        };
         filterInPlace(this.facturesChecked, obj => !selectedItem);
         console.log("ids for now",this.facturesChecked);
         console.log("selected:",selectedItem);
    }
       console.log("test test");
       console.log(this.facturesChecked);
       console.log(this.sum);
    }

    onCheckFact(){
        console.log("final test");
        console.log(this.facturesChecked);
        console.log(this.sum);

        //sum facturesChecked[].montant
        //this.sum = this.SumMontants(this.facturesChecked);

        //comparer avec le cheque
        this.ecart = this.chequeSaisi.montant - this.sum;


        //last thing to do: pass the result to the service FactureAg
        this.factAgService.facturesChecked = this.facturesChecked;
        this.factAgService.sum = this.sum;
        this.factAgService.ecart = this.ecart;
        this.router.navigate(['/cheque/paiementValider']);  
    }
    

    SumMontants(fact: FactureAgresso[]){
         var add :number = 0;
        for(let index in fact){
            add =+fact[index].montant;
            }
        return add; 
    }
    
    selectFactures(){
    }
}
