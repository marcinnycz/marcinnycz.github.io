import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  
  selected?: Date | null;

  zaplanowaneList: string[] = ['Moduł stojący - obręcz barkowa', 'Moduł klęczny - trening ogólny'];
  odbyteList: string[] = ['Moduł stojący - obręcz barkowa', 'Moduł klęczny - trening ogólny'];

  constructor() { }

  ngOnInit(): void {
  }

}
