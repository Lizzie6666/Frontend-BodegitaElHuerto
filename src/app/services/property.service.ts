import { Injectable } from '@angular/core';
import { Property } from '../models/Property';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) { }

  getproperties(){
    return this.http.get<Property[]>("http://localhost:3000/properties");
  }
  getpropertiesbyID(id:number){
    return this.http.get<Property>("http://localhost:3000/properties"+"/"+id.toString());
  }
  
}
