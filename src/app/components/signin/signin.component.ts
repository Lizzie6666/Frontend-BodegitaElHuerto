import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.SignInForm();
  }

  SignInForm() {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.required],
      date: ['', [Validators.required, Validators.min(1), Validators.max(31)]]
    });
  }

  saveClient(): void {
    const client: Client = {
      id: 0,
      email: this.myForm.get('email')!.value,
      password: this.myForm.get('password')!.value,
      name: this.myForm.get('name')!.value,
      lastname: this.myForm.get('lastname')!.value,
      phone: this.myForm.get('phone')!.value,
      dni: this.myForm.get('dni')!.value,
      address: this.myForm.get('address')!.value,
      date: this.myForm.get('date')!.value,
    };

    if (this.myForm.valid) {
      this.clientService.addClient(client).subscribe({
        next: (data) => {
          this.snackBar.open('La cuenta se creó correctamente.', 'OK', {
            duration: 2000
          });
        }
      });
    } else {
      this.snackBar.open('Debe completar los campos requeridos', '', {
        duration: 3000
      });
    }
  }
}