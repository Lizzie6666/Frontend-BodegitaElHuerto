import { Client } from './../../models/Client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/Property';
import { Quotation } from 'src/app/models/Quotation';
import { ClientService } from 'src/app/services/client.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-myquots',
  templateUrl: './myquots.component.html',
  styleUrls: ['./myquots.component.css']
})
export class MyquotsComponent implements OnInit {

  id!: number;

  dataSource = new MatTableDataSource<Quotation>();
  displayedColumns: string[] = ["name", "period", "tax", "amount"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private activatedRouter: ActivatedRoute,
              private clientservice: ClientService,
              private router: Router,
              private configservice: ConfigurationService,
              private propservice: PropertyService) { }

  ngOnInit(): void {
    const iduser = this.activatedRouter.snapshot.queryParamMap.get('iduser');
    this.id = Number(iduser);
    this.loadUser();

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

  completequots!:Quotation[];
  loadquots(){
    this.configservice.getquotbyUserID(this.id).subscribe({
      next:(data:Quotation[])=>{
        this.completequots = data;
        this.join();

        this.dataSource = new MatTableDataSource(this.completequots);
        this.dataSource.paginator = this.paginator;
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
        console.log(this.prop);
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

}
