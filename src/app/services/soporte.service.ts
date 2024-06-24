import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capit } from '../models/Cap';

@Injectable({
  providedIn: 'root'
})
export class SoporteService {

  constructor(private http: HttpClient) { }

  getcaps(){
    return this.http.get<Capit[]>("http://localhost:3000/Caps");
  }
}
