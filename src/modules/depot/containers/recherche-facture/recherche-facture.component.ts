import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'fr-FR');
import { Facture, Societe, Fournisseur, TypeDoc, Userlbv } from '@modules/depot/models';
import { FactureService, TypedocService, FournisseurService, SocieteService, UserlbvService } from '@modules/depot/services';

import { Router } from '@angular/router';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './recherche-facture.component.html',
    styleUrls: ['recherche-facture.component.scss'],
})
export class RechercheFactureComponent implements OnInit {

    public isAdmin = true;
    public userlbvs:any;

    public selectedUser;

    public currentFournisseur: Fournisseur;
    public currentUlbv: Userlbv;
    public currentFacture?: Facture;
    public mode: number=1;
    public currentSociete: Societe;
    splitUlbv: any;
    selectedPrenom: any;
    selectedNom: any;

    public data: any;
    public factureList: any[];
    public finalFac: any;
    public testsociete: any;
    public testuser: any;
    public size:number=3;
    public currentPage:number=0;
    public currentMontant:number;
    public totalPages:number;
    public pages:Array<number>;
    public currentCnuf: number;
    public currentIdUlbv: any;
    public currentIdSociete: any;
  currentLibF: string;


    constructor(
      private factureService:FactureService,
      private typedocService:TypedocService,
      private fournisseurService:FournisseurService,
      private societeService:SocieteService,
      private userlbvService:UserlbvService,
      private router:Router){
        
        
  
  
  
  this.userlbvService.getUserlbvs()
  .subscribe(data=>{
            this.userlbvs=data;
        },err=>{
            console.log(err);
        })      
    
  }


    ngOnInit(){}

    /*
    onGetFactures(){
        this.factureService.getFactures(this.currentPage,this.size)
        .subscribe(data=>{
                  this.totalPages=data["page"].totalPages;
                  this.pages=new Array<number>(this.totalPages);
                  this.factures=data;
              },err=>{
                  console.log(err);
              })
      }
      */

      
      onPageFacture(i){
        this.currentPage=i;
        this.chercherFactures();
      }
      
      onChercher(data){

        console.log("awalan"+data);
        if((this.selectedUser!=null)&&(this.selectedUser!=undefined)){
          this.splitUlbv=this.selectedUser.split(" ");
          this.selectedNom = this.splitUlbv[0];
          this.selectedPrenom = this.splitUlbv[1];
          this.userlbvService.getUserlbvByNoms(this.selectedNom,this.selectedPrenom)
          .subscribe(res=>{
            data.userlbv=res;

            if((data.userlbv!=null)&&(data.userlbv!=undefined)){
              this.currentUlbv = data.userlbv;
              console.log("currentUlbv", this.currentUlbv);
              this.currentIdUlbv=this.currentUlbv.idUlbv;
              console.log("currentIdUlbv", this.currentIdUlbv);
            }

          },err=>{
            console.log(err);
          });
        }

        if((data.libelleFrs!=null)&&(data.libelleFrs!=undefined)){
          this.fournisseurService.getFournisseurByLibelle(data.libelleFrs)
              .subscribe(res=>{
              data.fournisseur=res;
              if((data.fournisseur!=null)&&(data.fournisseur!=undefined)){
                this.currentFournisseur=data.fournisseur;
                console.log("currentFournisseur", this.currentFournisseur);  
                this.currentLibF = this.currentFournisseur.libelleFrs;
                console.log("currentLibF", this.currentLibF);
              }
            },err=>{
              console.log(err);
            });
          }
          console.log("data lwla")
          console.log(data)
          this.currentPage=0;
              






          this.chercherFactures();
        }
        
        chercherFactures(){

          this.factureService
          .getFacturesByCriteria(this.currentIdUlbv,this.currentLibF)
          .subscribe(data=>{
                    //this.totalPages=data["page"].totalPages;
                    //this.pages=new Array<number>(this.totalPages);
                    this.factureList=data["_embedded"].factures;
                    console.log("FACTURELIST",this.factureList);
                    this.dataByHref(this.factureList);
                  },err=>{
                    console.log(err);
                  });


                    



/*
        console.log("before");
        console.log(this.factureList);

        this.factureService
        .getFacturesByCriteria(this.currentIdUlbv,this.currentLibF)
        .subscribe(data=>{
                  //this.totalPages=data["page"].totalPages;
                  //this.pages=new Array<number>(this.totalPages);
                  this.factureList=data["_embedded"].factures;
                  console.log("haha",this.factureList);
                  this.dataByHref(this.factureList);

                },err=>{
                  console.log(err);
              });
*/
      }


    

      dataByHref(factureList: any){

        for(let index in factureList){
          this.societeService.getSocieteByHref(factureList[index]._links.societe.href)
          .subscribe(res=>{
              factureList[index].societe=res;
          },err=>{
              console.log(err);
          });
          
          this.userlbvService.getUlbvByHref(factureList[index]._links.userlbv.href)
              .subscribe(res=>{
                  factureList[index].userlbv=res;
              },err=>{
                  console.log(err);
              });

          this.fournisseurService.getFournisseurByHref(factureList[index]._links.fournisseur.href)
          .subscribe(res=>{
              factureList[index].fournisseur=res;
          },err=>{
              console.log(err);
            });

          this.typedocService.getTypeByHref(factureList[index]._links.typedoc.href)
          .subscribe(res=>{
            factureList[index].typedoc=res;
          },err=>{
            console.log(err);
          });
        }
        console.log("societeee aji",factureList);
      }
      
        onDeleteFacture(f,id){
          let conf=confirm("Etes-vous sûr(e)");
          if(conf){
            this.factureList.splice(id,1);

            this.factureService.deleteSource(f._links.self.href)
              .subscribe(data=>{
              },err=>{
                console.log(err);
              })
          }
        }

        onUpdateFacture(f){
          let conf=confirm("Etes-vous sûr(e)");
          if(conf){
            this.factureService.updateResource(f._links.self.href,f)
              .subscribe(data=>{
                
              },err=>{
                console.log(err);
              })
          }
        }
      selectChangeHandlerU(event?: any){
          this.selectedUser=event.target.value;
      }

      updateList(id: number, property: string, event: any) {
        const editField = event.target.textContent;
        this.factureList[id][property] = editField;
      }
}
