import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypePaiement } from '../models/typepaiement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypepaiementService {

  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }

  public getTypePaiements(){
    return this.httpClient.get(this.host+"/typePaiements");
  }
  
  public getTypePaiement(idTypepaiement: number){
    return this.httpClient.get(this.host+"/typePaiements/"+idTypepaiement);
  }


  public findById(idTypepaiement: number){
    return <Observable<TypePaiement>> this.httpClient.get(this.host+"/typePaiements/"+idTypepaiement);
  }

  public saveResource(url,data):Observable<TypePaiement>{
    return <Observable<TypePaiement>>this.httpClient.post(url,data);
  }

  public getTypepaiementByLibelle(libelleTypepaiement: string) {
    return this.httpClient.get(this.host+"/typePaiements/search/byLibelleTypepaiement?libtp="+libelleTypepaiement);
  }
  public getTypeByHref(url?): Observable<TypePaiement>{
    return <Observable<TypePaiement>> this.httpClient.get(url);
  }



}
