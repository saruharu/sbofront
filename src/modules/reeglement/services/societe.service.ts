import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Societe } from '../models/societe.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocieteService {
  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }

  public getSocietes(){
    return this.httpClient.get(this.host+"/societes");
  }

  public getSociete(idSociete: number){
    return this.httpClient.get(this.host+"/societes/"+idSociete);
  }

  public getSocieteByLibelle(libelleSociete: string) {
    return this.httpClient.get(this.host+"/societes/search/byLibelleSociete?libs="+libelleSociete);
  }
  
  public getSocieteByHref(url?): Observable<Societe>{
    return <Observable<Societe>> this.httpClient.get(url);
  }
}
