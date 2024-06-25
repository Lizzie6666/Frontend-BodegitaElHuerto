import { Capit } from './../../models/Cap';
import { Configfav } from './../../models/Configfav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Configquot } from 'src/app/models/Configquot';
import { Quotation } from 'src/app/models/Quotation';
import { SoporteService } from 'src/app/services/soporte.service';

@Component({
  selector: 'app-cotization',
  templateUrl: './cotization.component.html',
  styleUrls: ['./cotization.component.css']
})
export class CotizationComponent implements OnInit {

  id!: number;

  myForm!: FormGroup;


  //caps = ["Diario", "Quincenal","Mensual", "Bimestral", "Trimestral", "Cuatrimestral", "Semestral", "Anual"];

  capits!: Capit[];
  loadcaps(){
    this.soporte.getcaps().subscribe({
      next: (data) =>{
        this.capits = data;
      }
    })

  }



  gracias = ["Total", "Parcial"];



  constructor(private clientservice: ClientService,
              private activatedRouter:ActivatedRoute,
              private route: Router,
              private formBuilder:FormBuilder,
              private snackBar: MatSnackBar,
              private configservice: ConfigurationService,
              private router:Router,
              private soporte: SoporteService) { }

  ngOnInit(): void {
    const iduser = this.activatedRouter.snapshot.queryParamMap.get('iduser');
    console.log()
    this.id = Number(iduser);
    console.log(this.id);
    this.loadUser();
    this.loadform();
    this.loadcaps();
  }


  loadform(){
    this.myForm = this.formBuilder.group({
      capital: ["", []],
      gracia: ["", [Validators.required]]
    })
  }

  tipotasa!: string;
  checkradio(event: any){
    console.log(event.value);
    this.tipotasa = event.value;
    console.log(this.tipotasa);
  }

  moneda!: string;
  checkmoneda(event: any){
    console.log(event.value);
    this.moneda = event.value;
    console.log(this.moneda);
  }


  exist!: Configfav[];
  loadconfig(){
    this.configservice.getconfigbyid(this.usernow.id).subscribe({
      next:(data)=>{
        this.exist = data;
        console.log(this.exist);
        console.log(this.exist.length)
      }
    })
  }



  save(){

    const configfav:Configfav = {
      id:0,
      idclient: this.usernow.id,
      tasa: this.tipotasa,
      capitalizacion: this.myForm.get('capital')!.value,
      periodgracia: this.myForm.get('gracia')!.value,
      moneda: this.moneda
    };
    if(this.exist.length <= 0){
      if( this.myForm.valid){
        this.configservice.addconfig(configfav).subscribe({
          next: (data)=>{
            this.snackBar.open("Se añadió la config como favorita", 'OK', {
              duration: 2000 });
              this.exist.push(configfav);
          }
        });
      }else{
        this.snackBar.open("Debe completar los campos requeridos", '',{
          duration: 3000});
      }
    }
    else{
      this.snackBar.open("Ya tiene una configuración favorita", '',{
        duration: 3000});
      console.log(this.exist);
    }



  }

  continue(){

    const configquot:Configquot = {
      id:0,
      idclient: this.usernow.id,
      tasa: this.tipotasa,
      capitalizacion: this.myForm.get('capital')!.value,
      periodgracia: this.myForm.get('gracia')!.value,
      moneda: this.moneda
    };

    if( this.myForm.valid ){
      this.configservice.addconfigquot(configquot).subscribe({
        next: (data)=>{
          this.snackBar.open("Cotización generada", "OK");
          this.generateQuot(data.id);
        }
      });
    }else{
      this.snackBar.open("Debe completar los campos requeridos");
    }
  }

  generateQuot(idconfig: number){
    const quotation:Quotation = {
      id: 0,
      idclient: this.usernow.id,
      idconfigquot: idconfig,
      amount: 0,
      idprop: 0,
      period: 0,
      tax: 0,
      fee: 0,
      initial: false,
      final: false,
      gracia: 0,
      frecuency: '',
      taxdeg: 0,
      startDate: new Date() // Inicializar con la fecha actual o la fecha que desees

    };

    this.configservice.addQuot(quotation).subscribe({
      next:(data) =>{
        this.router.navigate(
          ['/select-properties'],
          {
            queryParams: { idquot: data.id, idconfig: data.idconfigquot, iduser: data.idclient}}
          );
      }
    });
  }


  usernow!:Client;
  loadUser()
  {
    console.log(this.id);
    if(this.id!= undefined && this.id!= 0)
    {
      this.clientservice.getClientByID(this.id).subscribe(
        (data:Client)=>{
          this.usernow = data;
          console.log("name: " + this.usernow.name);
          this.loadconfig();
        }
      );
    }
    else
    {
      this.route.navigate(["/login"]);
    }
  }


}
