import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css']
})
export class DebtComponent implements OnInit { 
  usernow?: Client;

  ngOnInit(): void {
    // Recuperar información del usuario desde localStorage
    const usernowStr = localStorage.getItem('usernow');
    if (usernowStr) {
      this.usernow = JSON.parse(usernowStr);
    }
  }
}
