import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';


@Component({
  selector: 'postures',
  templateUrl: './postures.component.html',
  styleUrls: ['./postures.component.css']
})
export class PosturesComponent implements OnInit {
  
  postures:Posture[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.check();
  }
  
  check(): void {
    this.sharedService.getPostures()
      .subscribe(data=>this.postures=data as Posture[]);
    alert(this.postures[5].IMUChestY + " " + this.postures[5].IMUPelvisY);
  }
}

export interface Posture {
  PostureId:number;
  PatientId:number;
  ExaminationDate:String;
  IMUPelvisY:number;
  IMUChestY:number;
}
