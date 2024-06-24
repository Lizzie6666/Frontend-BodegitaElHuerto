import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  e?:typeof environment;

  constructor(private http:HttpClient) { }

  addClient(client:Client)
  {
    return this.http.post<Client>("http://localhost:3000/clients", client);
  }

  getClients(){
    return this.http.get<Client[]>(this.e?.server+ "/clients");
  }
  getClientByID(id:number){
    return this.http.get<Client>("http://localhost:3000/clients"+"/"+id.toString());
  }
  getClientAsAny(){
    return this.http.get<any>("http://localhost:3000/clients");
  }
}
