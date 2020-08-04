import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FactureAgresso, Cheque } from '../models';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FactureAgService {

  public facturesChecked: FactureAgresso[];
  public sum : number;
  public ecart: number;

  constructor(private httpClient:HttpClient) { }




  public host:string="http://localhost:8081"

  public getFactureAgs(){
    return this.httpClient.get(this.host+"/factureAgressoes/"); 
  }

  public getFactureAgByFrs(cnuf: number){
    return this.httpClient.get(this.host+"/factureAgressoes/search/byFrs?cnuf="+cnuf); 
  }

  public getFactAgByCriteria(cnuf:number){
    return this.httpClient.get(this.host+"/factureAgressoes/search/byCriteria?cnuf="+cnuf);
  }
 //test test
  public updateResourceStatutValid(idFactAg: number,idCheque: number){
    return this.httpClient.post(this.host+"/listFactAgsValid/"+idFactAg,idCheque);
  }

  public updateResourceStatutWait(idFactAg: number,idCheque: number){
    return this.httpClient.post(this.host+"/listFactAgsWait/"+idFactAg,idCheque);
  }

    public getFactAgsByHref(url?): Observable<FactureAgresso[]>{
    return <Observable<FactureAgresso[]>> this.httpClient.get(url);
  }

    public getFactAgByNum(numFactAg:number){
    return this.httpClient.get(this.host+"/factureAgressoes/search/byNum?numFactAg="+numFactAg);
  }


  

}
