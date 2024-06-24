import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { config } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { Property } from 'src/app/models/Property';
import { Quotation } from 'src/app/models/Quotation';
import { showquot } from 'src/app/models/Showquot';
import { ClientService } from 'src/app/services/client.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dataSource = new MatTableDataSource<Quotation>();
  displayedColumns: string[] = ["name", "period", "tax", "amount"];


  id!: number;
  constructor(private clientservice: ClientService,
              private activatedRouter:ActivatedRoute,
              private router: Router,
              private configservice: ConfigurationService,
              private propservice: PropertyService) { }

  ngOnInit(): void {
    const iduser = this.activatedRouter.snapshot.queryParamMap.get('iduser');
    this.id = Number(iduser);
    this.loadUser();
  }

  completequots!:Quotation[];
  quotsmain: Quotation[] = [];
  loadquots(){
    this.configservice.getquotbyUserID(this.id).subscribe({
      next:(data:Quotation[])=>{
        this.completequots = data;
        this.join();
        
        
        
        while(this.quotsmain.length < 1 && data.length >= 1){

          let number = Math.floor(Math.random() * data.length);
          console.log(number);
          if(!this.quotsmain.includes(data[number])){
            this.quotsmain.push(data[number]);
          }
  
          this.dataSource = new MatTableDataSource(this.quotsmain);
        }
      }
    })
  }

  props!: Property[];
  join(){
    this.propservice.getproperties().subscribe({
      next:(data)=>{
        this.props = data;
      }
    })
  }
  
  prop!: Property;
  returnprop(id: number):string{

    this.props.forEach((find: Property) =>{
      if(find.id == id){
        this.prop = find;
      }
    })

    return this.prop?.name;
  }

  quotselect !: Quotation;
  showplan(row:Quotation){
    this.quotselect = row;

    this.router.navigate(['payments-periods'], {
      queryParams:{
        iduser: this.quotselect.idclient,
        idquot: this.quotselect.id,
        idprop: this.quotselect.idprop
      }
    }) 
  }

  usernow!:Client;
  loadUser()
  {
    if(this.id!= undefined && this.id!= 0)
    {
      this.clientservice.getClientByID(this.id).subscribe(
        (data:Client)=>{
          this.usernow = data;
          this.loadquots();
        }
      );
    }
    else
    {
      this.router.navigate(["/login"]);
    }
  }
  
}
