import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { EmptyhomeComponent } from './components/emptyhome/emptyhome.component'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { MainComponent } from './components/main/main.component';
import { CotizationComponent } from './components/cotization/cotization.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParamsmenuComponent } from './components/paramsmenu/paramsmenu.component';
import { SelectpropertiesComponent } from './components/selectproperties/selectproperties.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MyquotsComponent } from './components/myquots/myquots.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { DebtComponent } from './components/debt/debt.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
    EmptyhomeComponent,
    LoginComponent,
    SigninComponent,
    MainComponent,
    CotizationComponent,
    NavbarComponent,
    ParamsmenuComponent,
    SelectpropertiesComponent,
    PaymentsComponent,
    MyquotsComponent,
    MyaccountComponent,
    DebtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
