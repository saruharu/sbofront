import { ChangeDetectionStrategy, Component, OnInit, Input, Type, Output } from '@angular/core';
import { Cheque, Societe, Fournisseur, TypePaiement, Userlbv, Banque} from '@modules/cheque/models';
import { ChequeService, TypepaiementService, FournisseurService, SocieteService, UserlbvService, BanqueService } from '@modules/cheque/services';



import { Router } from '@angular/router';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './paiementCheque.component.html',
    styleUrls: ['paiementCheque.component.scss'],
})
export class PaiementChequeComponent implements OnInit {

    public typesPaiement:any;
    public fournisseurs:any;
    public societes:any;
    public userlbvs:any;
    public banques:any;

    public currentFrs: Fournisseur;

    public selectedType;
    public selectedSociete;
    public selectedUser;
    public selectedBanque;

    public chequeSaisi: any;
    splitUlbv: any;
    selectedPrenom: any;
    selectedNom: any;
    frs: any;
    user: any;
    nomComplet: any;


    constructor(
        private chequeService:ChequeService,
        private typepaiementService:TypepaiementService,
        private fournisseurService:FournisseurService,
        private societeService:SocieteService,
        private userlbvService:UserlbvService,
        private banqueService: BanqueService,
        private router:Router
    ) {

        this.LoadData();

    // FIN LISTE ROULANTE
    }
    datee;


    ngOnInit() {
        this.datee = new Date();

    }

    //Recuperer les select des listes roulantes
    selectChangeHandlerS(event: any){
        this.selectedSociete=event.target.value;
    }
    selectChangeHandlerT(event: any){
        this.selectedType=event.target.value;

    }
    selectChangeHandlerU(event: any){
        this.selectedUser=event.target.value;
    }

    selectChangeHandlerB(event: any){
        this.selectedBanque=event.target.value;
    }

    //FIN SELECT VALUES

    
    //Afficher LibFrs et echeance apres cnuf saisi
    onSearchChange(value) {  
        console.log("cnuf");
        console.log(value);
        this.getFrs(value);
      }

    getFrs(libelleFrs: string) {

       this.fournisseurService.getFournisseurByLibelle(libelleFrs)
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
        this.nomComplet = null;


    }

    isFrs(): boolean{
        if(this.frs !(null)) { return true;}
        else {return false;}
    }




    onHoldCheque(data){

        
       // Recuperer les objets depuis leurs attributs selectionnes (lib, id...)
       this.fournisseurService.getFournisseurByLibelle(data.libelleFrs)
        .subscribe(res=>{
            data.fournisseur=res;
        },err=>{
            console.log(err);
        });

        
        this.societeService.getSocieteByLibelle(this.selectedSociete)
        .subscribe(res=>{
            data.societe=res;
        },err=>{
            console.log(err);
        });
        
        this.typepaiementService.getTypepaiementByLibelle(this.selectedType)
        .subscribe(res=>{
            data.typepaiement=res;
        },err=>{
            console.log(err);
        });
        
        this.banqueService.getBanqueByLibelle(this.selectedBanque)
        .subscribe(res=>{
            data.banque=res;
        },err=>{
            console.log(err);
        });
        
        
        this.SplitNames();
        
        this.userlbvService.getUserlbvByNoms(this.selectedNom,this.selectedPrenom)
        .subscribe(res=>{
            data.userlbv=res;
        },err=>{
            console.log(err);
        });

        // FIN GET SELECTED OBJECTS


        // Stocker le cheque
        this.chequeSaisi = data;
        console.log("the end");
        console.log(this.chequeSaisi);
        console.log(data);

        //envoyer le cheque au service cheque
        this.chequeService.data = data;
        //naviguer vers Cocher component
        this.router.navigate(['/cheque/paiementCocher']);        
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
    this.typepaiementService.getTypePaiements()
    .subscribe(data=>{
              this.typesPaiement=data;
          },err=>{
              console.log(err);
          })  
    this.userlbvService.getUserlbvs()
    .subscribe(data=>{
              this.userlbvs=data;
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
    
    SplitNames(){
            this.splitUlbv=this.nomComplet.split(" ");
            this.selectedNom = this.splitUlbv[0];
            this.selectedPrenom = this.splitUlbv[1];
        }

}
        

//CODE JUST IN CASE
        /*
        data= {
            numCheque: data.numCheque,
            montant: data.montant,
            
            fournisseur:{
                cnuf: data.cnuf,
                libelleFrs: data.libelleFrs,
                echeanceFrs: data.echeanceFrs,
            },
            
            societe:{
                idSociete: data.idSociete,
                libelleSociete: this.selectedSociete,
            },
            typepaiement:{
                idTypepaiement: data.typepaiement.idTypepaiement,
                libelleTypepaiement: this.selectedType,
            },
            userlbv:{
                idUlbv: data.userlbv.idUlbv,
                nomUlbv: data.userlbv.nomUlbv,
                prenomUlbv: data.userlbv.prenomUlbv,
            },
            banque:{
                idBanque: data.banque.idBanque,
                libelleBanque: data.banque.libelleBanque,
            }

            
            
        };

        */

        

