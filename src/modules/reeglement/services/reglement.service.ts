import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reglement } from '@modules/tables/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReglementService {


  
  public host:string="http://localhost:8081"

  public hostCriteria: string = "http://localhost:8081/reglements/search/byCriteria?";


  constructor(private httpClient:HttpClient) { }
  private numChequebit: string ="";
  private cnufbit: string ="";
  private montantbit: string ="";


  
  public getReglement(idReglement: number){
    return this.httpClient.get(this.host+"/reglements/"+idReglement); 
  }
  public getReglements(){
    return this.httpClient.get(this.host+"/reglements/"); 
  }
  
  public getReglementsByMontant(montant?: number){
    return this.httpClient.get(this.host+"/reglements/search/byMontant?montant="+montant);
  }

    public getReglementsBySociete(idSociete?: number){
    return this.httpClient.get(this.host+"/reglements/search/byIdSociete?id_societe="+idSociete);
  }

  public getReglementsByCnuf(cnuf?: number){
    return this.httpClient.get(this.host+"/reglements/search/byCnuf?cnuf="+cnuf);
  }

  public getReglementsByCriteria(  cnuf?: any, numCheque?:any){
      if((cnuf!=null)||(cnuf!=undefined)){ this.cnufbit="&cnuf="+cnuf;}
      if((numCheque!=null)||(numCheque!=undefined)){ this.numChequebit="&num_cheque="+numCheque;}
      
    return this.httpClient
        .get(this.hostCriteria+this.cnufbit+this.numChequebit);
  }


  public deleteSource(url){
    return this.httpClient.delete(url);
  }

  
  public saveResource(url,data):Observable<Reglement>{
    return <Observable<Reglement>>this.httpClient.post(url,data);
  }

  public updateResource(url,data):Observable<Reglement>{
    return <Observable<Reglement>>this.httpClient.put(url,data);
  }
}
