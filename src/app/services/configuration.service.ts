import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configfav } from '../models/Configfav';
import { Configquot } from '../models/Configquot';
import { Quotation } from '../models/Quotation';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http:HttpClient) { }

  addconfig(config: Configfav)
  {
    return this.http.post<Configfav>("http://localhost:3000/configfavs", config);
  }

  getconfigbyid(id: number)
  {
    return this.http.get<Configfav[]>("http://localhost:3000/configfavs/?idclient=" + id.toString());
  }
  getconfigquotbyid(id: number)
  {
    return this.http.get<Configquot>("http://localhost:3000/configquots/" + id.toString());
  }

  addconfigquot(config: Configquot)
  {
    return this.http.post<Configquot>("http://localhost:3000/configquots", config);
  }

  addQuot(quotation: Quotation)
  {
    return this.http.post<Quotation>("http://localhost:3000/quotations", quotation);
  }

  editQuot(quotation: Quotation)
  {
    return this.http.put<Quotation>("http://localhost:3000/quotations/"+ quotation.id.toString(), quotation);
  }

  getquotbyID(id: number)
  {
    return this.http.get<Quotation>("http://localhost:3000/quotations/" + id.toString());
  }
  getquotbyUserID(id: number)
  {
    return this.http.get<Quotation[]>("http://localhost:3000/quotations/?idclient=" + id.toString()+"&final=true");
  }


}
