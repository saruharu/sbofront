import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { ReglementService, TypereglementService, FournisseurService, SocieteService , BanqueService} from '@modules/reeglement/services';
import { Router } from '@angular/router';
import { Societe, Fournisseur } from '@modules/reeglement/models';
import { Reglement } from '@modules/tables/models';

@Component({
  selector: 'sb-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {


  public isAdmin = false;
    public userlbvs:any;

    public selectedUser;

    public currentFournisseur: Fournisseur;
    public currentReglement?: Reglement;
    public mode: number=1;
    public currentSociete: Societe;


    public data: any;
    public reglementList: any[];
    public finalReg: any;
    public testsociete: any;
    public size:number=3;
    public currentMontant:number;
    public totalPages:number;
    public pages:Array<number>;
    public currentCnuf: number;
    public currentIdSociete: any;
  currentLibF: string;
  currentNum: any;

  constructor(
    private reglementService:ReglementService,
    private typereglementService:TypereglementService,
    private fournisseurService:FournisseurService,
    private banqueService:BanqueService,
    private societeService:SocieteService,
    private router:Router) { }

  ngOnInit(): void {
  }


  onChercher(data){

    console.log("awalan"+data.value);
    if((data.numCheque!=null)&&(data.numCheque!=undefined)){
      this.currentNum = data.numCheque;
    }
    if((data.cnuf!=null)&&(data.cnuf!=undefined)){
      this.fournisseurService.getFournisseur(data.cnuf)
          .subscribe(res=>{
          data.fournisseur=res;
          if((data.fournisseur!=null)&&(data.fournisseur!=undefined)){
            this.currentFournisseur=data.fournisseur;
            console.log("currentFournisseur", this.currentFournisseur);  
            this.currentCnuf = this.currentFournisseur.cnuf;
            console.log("currentCnuf", this.currentCnuf);
          }
        },err=>{
          console.log(err);
        });
      }
      console.log("data lwla")
      console.log(data);

      this.chercherReglements();
    }
    
    chercherReglements(){

      this.reglementService
      .getReglementsByCriteria(this.currentCnuf,this.currentNum)
      .subscribe(data=>{
                this.reglementList=data["_embedded"].reglements;
                console.log("reglementList",this.reglementList);
                this.dataByHref(this.reglementList);
              },err=>{
                console.log(err);
              });


                

  }




  dataByHref(reglementList: any){

    for(let index in reglementList){
      this.banqueService.getBanqueByHref(reglementList[index]._links.banque.href)
      .subscribe(res=>{
        reglementList[index].banque=res;
      },err=>{
          console.log(err);
      });
      this.societeService.getSocieteByHref(reglementList[index]._links.societe.href)
      .subscribe(res=>{
        reglementList[index].societe=res;
      },err=>{
          console.log(err);
      });

      this.fournisseurService.getFournisseurByHref(reglementList[index]._links.fournisseur.href)
      .subscribe(res=>{
        reglementList[index].fournisseur=res;
      },err=>{
          console.log(err);
        });

      this.typereglementService.getTypeByHref(reglementList[index]._links.typereglement.href)
      .subscribe(res=>{
        reglementList[index].typedoc=res;
      },err=>{
        console.log(err);
      });
    }
    console.log("societeee aji",reglementList);
  }
  
    onDeleteReglement(r,id){
      let conf=confirm("Etes-vous sûr(e)");
      if(conf){
        this.reglementList.splice(id,1);

        this.reglementService.deleteSource(r._links.self.href)
          .subscribe(data=>{
          },err=>{
            console.log(err);
          })
      }
    }

    onUpdateReglement(r){
      let conf=confirm("Etes-vous sûr(e)");
      if(conf){
        this.reglementService.updateResource(r._links.self.href,r)
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
    this.reglementList[id][property] = editField;
  }





   /*name of the excel-file which will be downloaded. */ 
fileName= 'ExcelSheet.xlsx';  

exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }
}
