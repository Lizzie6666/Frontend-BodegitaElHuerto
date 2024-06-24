import { PropertyService } from './../../services/property.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { Property } from 'src/app/models/Property';
import { Configfav } from 'src/app/models/Configfav';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Quotation } from 'src/app/models/Quotation';
import { Configquot } from 'src/app/models/Configquot';

@Component({
  selector: 'app-paramsmenu',
  templateUrl: './paramsmenu.component.html',
  styleUrls: ['./paramsmenu.component.css']
})
export class ParamsmenuComponent implements OnInit {

  idquot !: number;
  idprop!: number;
  iduser!: number;

  myForm!: FormGroup;

  frecuency = ["Mensual", "Bimestral", "Trimestral", "Cuatrimestral", "Semestral", "Anual"];
  gracias = ["Total", "Parcial"];

  constructor(private route: ActivatedRoute,
    private clientservice: ClientService,
    private router: Router,
    private formbuilder: FormBuilder,
    private propservice: PropertyService,
    private configservice: ConfigurationService) { }

  ngOnInit(): void {
    const quot = this.route.snapshot.queryParamMap.get('idquot');
    const prop = this.route.snapshot.queryParamMap.get('idprop')
    const user = this.route.snapshot.queryParamMap.get('iduser');

    this.idquot = Number(quot);
    this.iduser = Number(user);
    this.idprop = Number(prop);
    this.loadUser();
    this.loadform();
    this.loadProp();
    this.loadQuot()
  }

  continue() {
    this.myquot.period = this.myForm.get('period')?.value;
    this.myquot.tax = this.myForm.get('tax')?.value;
    this.myquot.fee = this.myForm.get('fee')?.value;
    this.myquot.frecuency = this.myForm.get('frec')?.value;
    this.myquot.gracia = this.myForm.get('gracia')?.value;
    this.myquot.taxdeg = this.myForm.get('taxDeg')?.value;
    this.myquot.initial = this.inicial;

    console.log(this.myquot.gracia);

    this.configservice.editQuot(this.myquot).subscribe({
      next: (data) => {

        this.router.navigate(['payments-periods'], {
          queryParams: {
            iduser: this.iduser,
            idquot: this.idquot,
            idprop: this.idprop
          }
        })
      }
    })
  }


  property!: Property;
  loadProp() {
    this.propservice.getpropertiesbyID(this.idprop).subscribe({
      next: (data) => {
        this.property = data;
      }
    })
  }

  myquot!: Quotation;
  configquot!: Configquot;
  loadQuot() {
    this.configservice.getquotbyID(this.idquot).subscribe({
      next: (data: Quotation) => {
        this.myquot = data;

        this.configservice.getconfigquotbyid(this.myquot.idconfigquot).subscribe({
          next: (data: Configquot) => {
            this.configquot = data;
          }
        })
      }
    })
  }

  loadform() {
    this.myForm = this.formbuilder.group(
      {
        period: [""],
        tax: [""],
        fee: [""],
        frec: [""],
        gracia: [""],
        taxDeg: [""]
      }
    )
  }

  usernow!: Client;
  loadUser() {
    console.log(this.iduser);
    if (this.iduser != undefined && this.iduser != 0) {
      this.clientservice.getClientByID(this.iduser).subscribe(
        (data: Client) => {
          this.usernow = data;
        }
      );
    }
  }

  inicial = false;

  checkInicial(event: MatCheckboxChange) {
    console.log(this.inicial);
    if (event.checked) {
      this.inicial = true;
      console.log(this.inicial);
    }
    else {
      this.inicial = false;
      console.log(this.inicial);
    }
  }



}

