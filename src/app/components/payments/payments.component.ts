import { Configquot } from './../../models/Configquot';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { Quotation } from 'src/app/models/Quotation';
import { ClientService } from 'src/app/services/client.service';
import { Property } from 'src/app/models/Property';
import { PropertyService } from 'src/app/services/property.service';
import { Payment } from 'src/app/models/Pago';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { SoporteService } from 'src/app/services/soporte.service';
import { Capit } from 'src/app/models/Cap';
import { of, config } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';





@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  idquot!: number;
  idprop!: number;
  iduser!: number;
  myForm!: FormGroup;

  cok!: number;

  dataSource = new MatTableDataSource<Payment>();
  displayedColumns: string[] = [
    'periodo',
    'gracia',
    'cuota',
    'monto_seguro',
    'amortizacion',
    'interes',
    'saldo',
    'fecha'// Añadir la columna de fecha aquí
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private clientservice: ClientService,
    private configservice: ConfigurationService,
    private propservice: PropertyService,
    private router: Router,
    private location: Location,
    private soporte: SoporteService,
    private formbuilder: FormBuilder,

  ) { }

  selectedPropertyName: string = ''; // Nueva variable

  ngOnInit(): void {
    const quot = this.route.snapshot.queryParamMap.get('idquot');
    const prop = this.route.snapshot.queryParamMap.get('idprop');
    const user = this.route.snapshot.queryParamMap.get('iduser');

    this.idquot = Number(quot);
    this.iduser = Number(user);
    this.idprop = Number(prop);
    this.loadUser();
    this.loadQuot();
    this.loadProp();
    this.loadcap();
    this.loadform();
  }

  pago: Payment[] = [];
  arr_pagos: Payment[] = [];
  myquot!: Quotation;
  configquot!: Configquot;
  perfrec!: number;

  npagos(frec: string) {
    switch (frec) {
      case 'Mensual': {
        this.perfrec = 12;
        break;
      }
      case 'Bimestral': {
        this.perfrec = 6;
        break;
      }
      case 'Trimestral': {
        this.perfrec = 4;
        break;
      }
      case 'Cuatrimestral': {
        this.perfrec = 3;
        break;
      }
      case 'Semestral': {
        this.perfrec = 2;
        break;
      }
      default: {
        this.perfrec = 1;
        break;
      }
    }
    return this.perfrec;
  }

  capi!: Capit[];
  loadcap() {
    this.soporte.getcaps().subscribe({
      next: (data) => {
        this.capi = data;
      },
    });
  }

  tasa!: number;
  tasaDeg!: number;
  tasashow!: number;
  tasaDegshow!: number;
  capn!: number;
  plazos!: number;
  initialfee!: number;
  inmonto!: number;

  paymenttable() {

    let currentDate = new Date(); // Puedes ajustar esto según tu lógica de negocio para obtener la fecha de inicio adecuada
    //let currentDate = new Date(this.myquot.startDate);

    this.tasa = this.myquot.tax / 100;
    this.tasaDeg = this.myquot.taxdeg / 100;
    this.tasashow = this.myquot.tax / 100;

    console.log('capital: ' + this.configquot.capitalizacion);
    this.capi.forEach((cap: Capit) => {
      if (cap.cap == this.configquot.capitalizacion) {
        this.capn = cap.dias;
      }
    });

    //Nominal anual a Efectiva anual
    if (this.configquot.tasa == 'nominal') {
      let n = this.npagos(this.configquot.capitalizacion);
      console.log(this.capn);
      this.tasa = Math.pow(1 + this.tasa / (360 / this.capn), n) - 1;

      //console.log('M: ' + 360 / this.capn);
      //console.log('N: ' + n);
      //console.log('tasa: ' + this.tasa);
      //=(1+10%/60)^360-1
    }

    //Efectiva anual a Efectiva solic = (1+tasa)^(1/frecuencia)-1
    this.tasa = Math.pow(1 + this.tasa, 1 / this.npagos(this.myquot.frecuency)) - 1;
    this.tasashow = this.tasa * 100;

    //Tasa Degravamen anual a Efectiva solic
    this.tasaDeg = Math.pow(1 + this.tasaDeg, 1 / this.npagos(this.myquot.frecuency)) - 1;
    this.tasaDegshow = this.tasaDeg * 100;

    this.plazos = this.myquot.period * this.npagos(this.myquot.frecuency);
    let plazo = this.myquot.period * this.npagos(this.myquot.frecuency);

    let saldopagar = this.myquot.amount * (1 - this.myquot.fee / 100);
    let montototal = this.myquot.amount * (1 - this.myquot.fee / 100);
    this.inmonto = this.myquot.amount * (1 - this.myquot.fee / 100);
    this.initialfee = this.myquot.amount * (this.myquot.fee / 100);

    // Asegúrate de limpiar el array de pagos antes de agregar nuevos
    this.pago = [];


    //Cálculo de pagos
    for (let i = 1; i <= plazo; i++) {

      let intereses = 0
      let montoSeg = 0;
      let cuota = 0;
      let amortizacion = 0;
      let per_gracia = 'Normal';

      //Gracia total
      if (this.configquot.periodgracia == 'Total' && i <= this.myquot.gracia) {

        console.log("total" + i);
        saldopagar = saldopagar * (1 + this.tasa);
        montototal = montototal * (1 + this.tasa);
        per_gracia = 'Total';
        montoSeg = this.tasaDeg * saldopagar;
        cuota = montoSeg;
      }
      //Gracia parcial
      else {
        if (this.configquot.periodgracia == 'Parcial' && i <= this.myquot.gracia) {

          console.log("total" + i);
          montoSeg = this.tasaDeg * saldopagar;
          intereses = this.tasa * saldopagar;
          cuota = intereses + montoSeg;
          per_gracia = 'Parcial';
        }
        //Sin gracia
        else {

          intereses = saldopagar * this.tasa;
          montoSeg = this.tasaDeg * saldopagar;
          cuota = (montototal * (this.tasa + this.tasaDeg)) / (1 - Math.pow(1 + this.tasaDeg + this.tasa, -(plazo - this.myquot.gracia)));
          amortizacion = cuota - intereses - saldopagar * this.tasaDeg;
        }
      }

      const nuevo_pago: Payment = {
        saldo: saldopagar - amortizacion,
        periodo: i,
        gracia: per_gracia,
        cuota: cuota,
        amortizacion: amortizacion,
        interes: intereses,
        monto_seguro: montoSeg,
        fecha: new Date(currentDate) // Asigna la fecha actual al nuevo pago

      };
      this.pago.push(nuevo_pago);
      saldopagar -= amortizacion;

      // Incrementa la fecha para el próximo pago
      /*switch (this.myquot.frecuency) {
      case 'Mensual':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'Bimestral':
        currentDate.setMonth(currentDate.getMonth() + 2);
        break;
      case 'Trimestral':
        currentDate.setMonth(currentDate.getMonth() + 3);
        break;
      case 'Cuatrimestral':
        currentDate.setMonth(currentDate.getMonth() + 4);
        break;
      case 'Semestral':
        currentDate.setMonth(currentDate.getMonth() + 6);
        break;
      case 'Anual':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        console.error('Frecuencia no reconocida');
    }*/
  }

    this.dataSource = new MatTableDataSource(this.pago);
    this.arr_pagos = this.pago;
    this.dataSource.paginator = this.paginator;
  }

  COK!: number;
  VAN!: number;
  sug!: string;
  //Calculo de la VAN
  calculate_VAN() {

    this.VAN = 0;
    console.log(this.COK);
    for (let i = 0; i < this.pago.length; i++)
      this.VAN -= this.pago[i].cuota / Math.pow(1 + this.COK / 100, this.pago[i].periodo);

    this.VAN += this.myquot.amount;

    if (this.VAN > 0)
      this.sug = "Aceptar cotizacion";
    else if (this.VAN < 0)
      this.sug = "Rechazar cotizacion"
    else this.sug = "XD?"
  }

  save() {
    this.myquot.final = true;
    this.configservice.editQuot(this.myquot).subscribe({
      next: (data) => {
        console.log(this.myquot);
        this.router.navigate(['main'], {
          queryParams: {
            iduser: this.iduser,
          },
        });
      },
    });
  }

  back() {
    this.location.back();
  }

  property!: Property;
  loadProp() {
    this.propservice.getpropertiesbyID(this.idprop).subscribe({
      next: (data) => {
        this.property = data;
        this.selectedPropertyName = data.name; // Asignar el nombre de la propiedad
      },
    });
  }

  loadQuot() {
    this.configservice.getquotbyID(this.idquot).subscribe({
      next: (data: Quotation) => {
        this.myquot = data;

        this.configservice
          .getconfigquotbyid(this.myquot.idconfigquot)
          .subscribe({
            next: (data: Configquot) => {
              this.configquot = data;
              console.log(this.configquot);
              this.paymenttable();
            },
          });
      },
    });
  }

  usernow!: Client;
  loadUser() {
    console.log(this.iduser);
    if (this.iduser != undefined && this.iduser != 0) {
      this.clientservice
        .getClientByID(this.iduser)
        .subscribe((data: Client) => {
          this.usernow = data;
        });
    }
  }

  loadform() {
    this.myForm = this.formbuilder.group(
      {
        van: [""]
      }
    )
  }
}
