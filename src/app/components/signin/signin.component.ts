import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  myForm!: FormGroup;
  constructor(private formbuilder: FormBuilder,
              private clientservice: ClientService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.SignInForm();
 }

  SignInForm()
  {
    this.myForm = this.formbuilder.group(
      {
        name: [""],
        lastname: [""],
        phone: [""],
        dni: [""],
        email:[""],
        password:[""],
        address: [""]
      }
    )
  }


  saveClient():void
  {
    const client:Client = {
      id:0,
      email: this.myForm.get("email")!.value,
      password: this.myForm.get("password")!.value,
      name: this.myForm.get("name")!.value,
      lastname: this.myForm.get("lastname")!.value,
      phone: this.myForm.get("phone")!.value,
      dni: this.myForm.get("dni")!.value,
      address: this.myForm.get("address")!.value
    };

    
    if( this.myForm.valid ){

      this.clientservice.addClient(client).subscribe({
        next: (data)=>{
          this.snackBar.open("La cuenta se creó correctamente.", 'OK', {
            duration: 2000 });
        }
      });
    }else{
      this.snackBar.open("Debe completar los campos requeridos", '',{
        duration: 3000});
    }
  }

}