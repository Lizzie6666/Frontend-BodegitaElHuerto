import { ConfigurationService } from 'src/app/services/configuration.service';
import { Property } from './../../models/Property';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { PropertyService } from 'src/app/services/property.service';
import { config } from 'rxjs';
import { Quotation } from 'src/app/models/Quotation';

@Component({
  selector: 'app-selectproperties',
  templateUrl: './selectproperties.component.html',
  styleUrls: ['./selectproperties.component.css']
})
export class SelectpropertiesComponent implements OnInit {

  idquot !: number;
  idconfig!: number;
  iduser!: number;

  dataSource = new MatTableDataSource<Property>();
  displayedColumns: string[] = ["name", "district", "address", "size", "rooms", "pricedollar"];


  constructor(private route: ActivatedRoute,
              private clientservice: ClientService,
              private router: Router,
              private formbuilder: FormBuilder,
              private propertyservice: PropertyService,
              private configservice: ConfigurationService ) {}
  ngOnInit(): void {
    const quot = this.route.snapshot.queryParamMap.get('idquot');
    const config = this.route.snapshot.queryParamMap.get('idconfig');
    const user = this.route.snapshot.queryParamMap.get('iduser');
    
    this.idquot = Number(quot);
    this.idconfig = Number(config);
    this.iduser = Number(user);

    this.loadprops();
    this.loadQuot();
  }

  propertieslist!: Property[];
  loadprops(){
    this.propertyservice.getproperties().subscribe(
      (data: Property[]) =>{
        this.propertieslist = data;
        this.dataSource = new MatTableDataSource(data);

        this.mapping();
        console.log(this.districts);
      }
    );
  }

  propselect?:Property;
  table(row:Property)
  {
    console.log(row.name + row.district);
    this.propselect = row;

    this.myquot.amount = this.propselect.pricedollar;
    this.myquot.idprop = this.propselect.id;
    this.configservice.editQuot(this.myquot).subscribe({
      next:(data) =>{
        this.router.navigate(
          ['/params-quotation'],
          {
            queryParams: { idquot: this.idquot, iduser: this.iduser, idprop: this.propselect?.id }}
          );                         
      }
    }); 
  }






  districts!: string[];
  mapping(){
    this.districts = this.propertieslist.map(function(element){
      return element.district;
    })
    this.districts = this.districts.filter((valor, indice) => {
      return this.districts.indexOf(valor) === indice;
    });

    console.log(this.districts);

  }




  selectedValue?: string;
  test(){
    console.log(this.selectedValue);
    let valor = this.selectedValue;
    console.log(valor);

    let props: Property[];
    if(this.selectedValue != undefined){
      props = this.propertieslist.filter(function(element){
        return element.district == valor;
      })
    }
    else{
      props = this.propertieslist;
    }

    this.dataSource = new MatTableDataSource(props);
  }



  myquot!: Quotation;
  loadQuot(){
    console.log(this.idquot);

    if(this.idquot != undefined || this.idquot != 0){
      this.configservice.getquotbyID(this.idquot).subscribe({
        next:(data) =>{
          this.myquot = data;
        }
      });  
    }

  }

  
  usernow!:Client;
  loadUser()
  {
    console.log(this.iduser);
    if(this.iduser!= undefined && this.iduser!= 0)
    {
      this.clientservice.getClientByID(this.iduser).subscribe(
        (data:Client)=>{
          this.usernow = data;
        }
      );
    }
  }


}
