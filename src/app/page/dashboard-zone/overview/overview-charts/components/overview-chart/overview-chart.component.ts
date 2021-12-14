import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Salary} from '../../../../../../core/models/salary';
import {ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ApexLegend} from 'ng-apexcharts';
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
  legend: ApexLegend;
  tooltip: any;
};


@Component({
  selector: 'app-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.scss']
})
export class OverviewChartComponent implements OnInit {
  @ViewChild('chart') chart: OverviewChartComponent;
  public chartOptions: Partial<ChartOptions>;
  costs;
  contracts;
  wages
  skMonths: string[] = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];

  @Input() costsOverview;


  constructor() {
  }

  ngOnInit(): void {
    this.contracts = Object.values(this.costsOverview.categoryMonthsCostsDTOS[0].totalMonthsCosts)
    this.costs = Object.values(this.costsOverview.categoryMonthsCostsDTOS[1].totalMonthsCosts)
    this.wages = Object.values(this.costsOverview.categoryMonthsCostsDTOS[2].totalMonthsCosts)
    this.skMonths.forEach((graph, index) => {
      if (!this.contracts[index]) {
        this.contracts[index] = 0;
      }
      if (!this.costs[index]) {
        this.costs[index] = 0;
      }
      if (!this.wages[index]) {
        console.log
        this.wages[index] = 0;
      }
    });


    this.prepareChart();
  }

  private prepareChart(){
    this.chartOptions = {
      series: [
        {
          name: 'Zákazky',
          data: this.contracts
        },
        {
          name: 'Firemné náklady',
          data: this.costs
        },
        {
          name: 'Mzdy architekti',
          data: this.wages
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
        show: true,
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: this.skMonths,
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
