import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Fournisseur } from '../models/fournisseur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  frs: any;
  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }

  public getFournisseurs(){
    return this.httpClient.get(this.host+"/fournisseurs");
  }
  
  public getFournisseur(cnuf: number){
    return this.httpClient.get(this.host+"/fournisseurs/"+cnuf);
  }


  public findById(cnuf: number){
    return <Observable<Fournisseur>> this.httpClient.get(this.host+"/fournisseurs/"+cnuf);
  }

  public saveResource(url,data):Observable<Fournisseur>{
    return <Observable<Fournisseur>>this.httpClient.post(url,data);
  }

  public getFournisseurByLibelle(libelleFrs: string){
    return this.httpClient.get(this.host+"/fournisseurs/search/byLibelleFrs?libf="+libelleFrs);
  }

  
  public getFournisseurByHref(url?): Observable<Fournisseur>{
    return <Observable<Fournisseur>> this.httpClient.get(url);
  }
}
