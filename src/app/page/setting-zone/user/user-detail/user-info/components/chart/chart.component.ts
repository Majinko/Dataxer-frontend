import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis} from 'ng-apexcharts';
import {Salary} from '../../../../../../../core/models/salary';
import * as moment from 'moment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-salary-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() salary: Salary[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.prepareChart();
  }

  private prepareChart(){
    this.chartOptions = {
      series: [
        {
          name: 'Mzda €',
          data: this.salary.map(s => s.price)
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.salary.map(s => s.start),
        labels: {
          formatter(value: string, timestamp?: number, opts?: any): string | string[] {
            return moment(value).format('DD.MM.y');
          }
        }
      },
      yaxis: {
        labels: {
          formatter(val: number): string {
            return val + ' €';
          }
        }
      },
    };
  }
}
