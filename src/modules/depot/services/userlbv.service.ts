import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Userlbv } from '../models/userlbv.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserlbvService {


  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }

  public getUserlbvs(){
    return this.httpClient.get(this.host+"/userlbvs");
  }

  public getUserlbv(idUlbv: number){
    return this.httpClient.get(this.host+"/userlbvs/"+idUlbv);
  }

  public getUserlbvByNoms(nomUlbv?: string, prenomUlbv?: string) {
    return this.httpClient.get(this.host+"/userlbvs/search/byNoms?n="+nomUlbv+"&pn="+prenomUlbv);
  }

  public getUlbvByHref(url?): Observable<Userlbv>{
    return <Observable<Userlbv>> this.httpClient.get(url);
  }


}
