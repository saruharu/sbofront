import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Facture } from '../models/facture.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  public host:string="http://localhost:8081"

  public hostCriteria: string = "http://localhost:8081/factures/search/byCriteria?";


  constructor(private httpClient:HttpClient) { }
  private societebit: string ="";
  private ulbvbit: string ="";
  private libFbit: string ="";
  private montantbit: string ="";


  
  public getFacture(idFac: number){
    return this.httpClient.get(this.host+"/factures/"+idFac); 
  }
  public getFactures(){
    return this.httpClient.get(this.host+"/factures/"); 
  }
  
  public getFacturesByMontant(montant?: number){
    return this.httpClient.get(this.host+"/factures/search//byMontant?montant="+montant);
  }

    public getFacturesBySociete(idSociete?: number){
    return this.httpClient.get(this.host+"/factures/search//byIdSociete?id_societe="+idSociete);
  }

  public getFacturesByCriteria(idUlbv?: any,  libF?: any){
      if((libF!=null)||(libF!=undefined)){ this.libFbit="&libF="+libF;}
      if((idUlbv!=null)||(idUlbv!=undefined)) {this.ulbvbit="&id_ulbv="+idUlbv;}
    return this.httpClient
        .get(this.hostCriteria+this.libFbit+this.ulbvbit);
  }

  public getFacturesByUlbv(nom: string, prenom:string){
    return this.httpClient.get(this.host+"factures/search/byNomsUlbv?n="+nom+"&pn="+prenom);
  }

  public deleteSource(url){
    return this.httpClient.delete(url);
  }

  
  public saveResource(url,data):Observable<Facture>{
    return <Observable<Facture>>this.httpClient.post(url,data);
  }

  public updateResource(url,data):Observable<Facture>{
    return <Observable<Facture>>this.httpClient.put(url,data);
  }
  
  
}

