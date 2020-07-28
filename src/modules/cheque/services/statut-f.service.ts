import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StatutFService {

  public host:string="http://localhost:8081"

  constructor(private httpClient:HttpClient) { }


  public getStatut(idStatut: number){
    return this.httpClient.get(this.host+"/statutFactures/"+idStatut);
  }}
