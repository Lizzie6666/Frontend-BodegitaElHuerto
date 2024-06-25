import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() id?: number;
  @Input() mode?: number;

  usernow!: Client;

  constructor(private clientservice: ClientService, private route: Router) { }

  ngOnInit(): void {
    // Intentar recuperar información del usuario desde localStorage
    const usernowStr = localStorage.getItem('usernow');
    if (usernowStr) {
      this.usernow = JSON.parse(usernowStr);
      console.log(this.usernow.name);
    } else {
      // Si no hay información en localStorage, cargar desde el servidor
      this.loadUser();
    }
  }

  loadUser() {
    if (this.id !== undefined && this.id !== 0) {
      this.clientservice.getClientByID(this.id).subscribe(
        (data: Client) => {
          this.usernow = data;
          // Guardar información del usuario en localStorage
          localStorage.setItem('usernow', JSON.stringify(this.usernow));
        }
      );
    }
  }
}
