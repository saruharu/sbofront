import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Banque } from '../models/banque.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {


  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }

  public getBanques(){
    return this.httpClient.get(this.host+"/banques");
  }
  
  public getBanque(idBanque: number){
    return this.httpClient.get(this.host+"/banques/"+idBanque);
  }


  public findById(idBanque: number){
    return <Observable<Banque>> this.httpClient.get(this.host+"/banques/"+idBanque);
  }

  public saveResource(url,data):Observable<Banque>{
    return <Observable<Banque>>this.httpClient.post(url,data);
  }

  public getBanqueByLibelle(libelleBanque: string) {
    return this.httpClient.get(this.host+"/banques/search/byLibelleBanque?libb="+libelleBanque);
  }

  public getBanqueByHref(url?): Observable<Banque>{
    return <Observable<Banque>> this.httpClient.get(url);
  }
  

}
