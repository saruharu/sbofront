import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Cheque } from '../models/cheque.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChequeService {

  data: any;

  onWaitList: Cheque[];
  
  stub: any ={
    fournisseur:{
      cnuf: 1,
      libelleFrs: 'SONIAMA',
      echeanceFrs: 120
    },
    montant: 1000,
    numCheque: 1,
    typepaiement:{
      idTypepaiement:1,
      libelleTypepaiement: 'Cheque'
    }

  }

  
  

  public host:string="http://localhost:8081"
  private cnufbit: string ="";
  private libFbit: string ="";
  private numchequebit: string ="";
  private numFactAgbit: string ="";

  

  public hostCriteria: string = "http://localhost:8081/cheques/search/byCriteria?";

  constructor(private httpClient:HttpClient) { }

  public getCheques(page,size){
    return this.httpClient.get(this.host+"/cheques?page="+page+"&size="+size);
  }
   
  public getCheque(idCheque: number){
    return this.httpClient.get(this.host+"/cheques/"+idCheque);
  }
  

  public getChequesByCriteria(numCheque?:any, cnuf?:any, libF?: any){
    if((cnuf!=null)||(cnuf!=undefined)){ this.cnufbit="&cnuf="+cnuf;}
    if((libF!=null)||(libF!=undefined)){ this.libFbit="&libF="+libF;}
    if((numCheque!=null)||(numCheque!=undefined)) {this.numchequebit="&num_cheque="+numCheque;}
    //if((numFactAg!=null)||(numFactAg!=undefined)) {this.numFactAgbit="&numFactAg="+numFactAg;}

  return this.httpClient
      .get(this.hostCriteria+this.cnufbit+this.libFbit+this.numchequebit);
}


  public deleteSource(url){
    return this.httpClient.delete(url);
  }

  
  public saveResource(url,data){
    return this.httpClient.post(url,data);
  }

  public updateResource(url,data):Observable<Cheque>{
    return <Observable<Cheque>> this.httpClient.put(url,data);
  }
  
  
}
