import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypeDoc } from '../models/typedoc.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypedocService {

  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }

  public getTypesDoc(){
    return this.httpClient.get(this.host+"/typeDocs");
  }

  public getTypeDoc(idTypedoc: number){
    return this.httpClient.get(this.host+"/typeDocs/"+idTypedoc);
  }

  public getTypedocByLibelle(libelleTypedoc: string) {
    return this.httpClient.get(this.host+"/typeDocs/search/byLibelleTypedoc?libtd="+libelleTypedoc);
  }

  public getTypeByHref(url?): Observable<TypeDoc>{
    return <Observable<TypeDoc>> this.httpClient.get(url);
  }
  
}
