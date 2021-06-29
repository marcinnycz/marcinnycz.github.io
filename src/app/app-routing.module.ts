import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AnalysisComponent} from './analysis/analysis.component';
import {ModulesComponent} from './modules/modules.component';
import {MonographComponent} from './monograph/monograph.component';
import {PublicationsComponent} from './publications/publications.component';
import {ContactComponent} from './contact/contact.component';
import {FaqComponent} from './faq/faq.component';
import {LoginComponent} from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'analysis', component:AnalysisComponent, canActivate: [AuthGuardService]},
  {path: 'modules', component:ModulesComponent},
  {path: 'monograph', component:MonographComponent},
  {path: 'publications', component:PublicationsComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'faq', component:FaqComponent},
  {path: 'login', component:LoginComponent},
  {path: 'patient', component:PatientComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }