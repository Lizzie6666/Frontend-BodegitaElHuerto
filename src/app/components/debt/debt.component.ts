import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.css']
})
export class DebtComponent { 
  constructor(private router: Router) { }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
