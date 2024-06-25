import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css']
})
export class DebtComponent { 
  @Input() id?: number;
  @Input() mode?: number;
  constructor(private clientservice: ClientService,
              private route: Router) { }

  ngOnInit(): void {
    this.loadUser();
    console.log(this.usernow.name);
  }

  usernow!:Client;
  loadUser()
  {
    if(this.id!= undefined && this.id!= 0)
    {
      this.clientservice.getClientByID(this.id).subscribe(
        (data:Client)=>{
          this.usernow = data;
        }
      );
    }
  }



}
