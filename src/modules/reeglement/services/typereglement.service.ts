import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypeReglement } from '../models/typereglement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypereglementService {

  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }

  public getTypeReglements(){
    return this.httpClient.get(this.host+"/typeReglements");
  }
  
  public getTypeReglement(idTypereglement: number){
    return this.httpClient.get(this.host+"/typeReglements/"+idTypereglement);
  }


  public findById(idTypereglement: number){
    return <Observable<TypeReglement>> this.httpClient.get(this.host+"/typeReglements/"+idTypereglement);
  }

  public saveResource(url,data):Observable<TypeReglement>{
    return <Observable<TypeReglement>>this.httpClient.post(url,data);
  }

  public getTypereglementByLibelle(libelleTypereglement: string) {
    return this.httpClient.get(this.host+"/typeReglements/search/byLibelleTypereglement?libtp="+libelleTypereglement);
  }
  public getTypeByHref(url?): Observable<TypeReglement>{
    return <Observable<TypeReglement>> this.httpClient.get(url);
  }



}
