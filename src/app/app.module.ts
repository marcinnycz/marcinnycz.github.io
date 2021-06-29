import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SharedService } from './shared.service';
import { SidebarComponent } from './sidebar/sidebar.component';

import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ModulesComponent } from './modules/modules.component';
import { MonographComponent } from './monograph/monograph.component';
import { PublicationsComponent } from './publications/publications.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { PosturesComponent } from './postures/postures.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PatientComponent } from './patient/patient.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    AnalysisComponent,
    ModulesComponent,
    MonographComponent,
    PublicationsComponent,
    ContactComponent,
    FaqComponent,
    LoginComponent,
    PosturesComponent,
    LineChartComponent,
    PatientComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
