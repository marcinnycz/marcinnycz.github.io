import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import * as chartData from '../../assets/td4s.json';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnChanges {
  @Input() show: string = "";
  showBooleans: boolean[] = [];
  // public lineChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  // ];
  public shownLineChartData: ChartDataSets[] = [];
  public lineChartData: ChartDataSets[] = [];
  data: any[] = (chartData as any).default;
  public lineChartLabels: Label[] = ['III 2018', 'IV 2018', 'I 2019', 'II 2019', 'III 2019', 'IV 2019', 'I 2020', 'II 2020', 'III 2020', 'IV 2020', 'I 2021', 'II 2021'];
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
    elements: {
      line: {
          tension: 0.3//0.3
      }
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,255,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType :ChartType = 'line';
  public lineChartPlugins = [];

  @ViewChild('chart') lineChart: any;

  constructor() {}

  ngOnInit() {
    for(let i = 0; i < 24; i++)
    {
      let row: any[] = [];
      for(let j = 0; j < 12; j++)
      {
        row.push(this.data[i][j]);
      }
      this.lineChartData.push({ data: row, label: this.data[i]['Nazwa']});
    }
    this.showChart(this.show);
  }

  public showChart(values: string)
  {
    var arr = values.split(",");
    this.shownLineChartData = [];
    for(let i = 0; i < arr.length; i++)
    {
      for(let j = 0; j < this.lineChartData.length; j++)
      {
        if(arr[i].toLowerCase() == this.lineChartData[j].label?.toLowerCase())
        {
          this.shownLineChartData.push(this.lineChartData[j]);
          break;
        }
      } 
    }
  }

  ngOnChanges(changes: SimpleChanges)
  { 
    this.showChart(this.show);
  }
}