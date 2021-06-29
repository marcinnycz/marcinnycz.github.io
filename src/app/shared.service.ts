import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {Posture} from './postures/postures.component'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "https://localhost:44394/api";

  constructor(private http:HttpClient) { }

  getPatientList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/patient')
  }

  getPostures():Observable<Posture[]>{
    return this.http.get<Posture[]>(this.APIUrl+'/postures');
  }
}
