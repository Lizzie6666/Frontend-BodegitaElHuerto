import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  fixedNumber: number = 15;  // Número inicial, modificable por el usuario

  id!: number;
  usernow!: Client;

  constructor(
    private activatedRouter: ActivatedRoute,
    private clientservice: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const iduser = this.activatedRouter.snapshot.queryParamMap.get('iduser');
    this.id = Number(iduser);
    this.loadUser();
  }

  loadUser(): void {
    if (this.id !== undefined && this.id !== 0) {
      this.clientservice.getClientByID(this.id).subscribe(
        (data: Client) => {
          this.usernow = data;
        },
        error => {
          this.router.navigate(["/login"]);
        }
      );
    } else {
      this.router.navigate(["/login"]);
    }
  }

  onNumberChange(): void {
    console.log('Número actualizado:', this.fixedNumber);
    localStorage.setItem('userNumber', this.fixedNumber.toString());  // Asegúrate de que la clave en localStorage es la correcta
  }

}
