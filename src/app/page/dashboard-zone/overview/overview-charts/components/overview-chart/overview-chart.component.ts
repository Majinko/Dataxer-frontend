import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ApexLegend, ApexAnnotations } from 'ng-apexcharts';

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
  annotations: ApexAnnotations;
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
  wages;
  toggleVal = false;
  profitSeries = [
    {
      id: 0,
      show: true
    },
    {
      id: 1,
      show: true
    }, {
      id: 2,
      show: true
    },
  ];
  enabledSeries = [0, 1, 2, 3];
  skMonths: string[] = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];

  @Input() costsOverview;


  constructor() {
  }

  ngOnInit(): void {
    this.contracts = Object.values(this.costsOverview.categoryMonthsCostsDTOS[0].totalMonthsCosts);
    this.costs = Object.values(this.costsOverview.categoryMonthsCostsDTOS[1].totalMonthsCosts);
    this.wages = Object.values(this.costsOverview.categoryMonthsCostsDTOS[2].totalMonthsCosts);
    this.skMonths.forEach((graph, index) => {
      if (!this.contracts[index]) {
        this.contracts[index] = 0;
      }
      if (!this.costs[index]) {
        this.costs[index] = 0;
      }
      if (!this.wages[index]) {
        this.wages[index] = 0;
      }
    });


    this.prepareChart();
  }

  private prepareChart() {
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
        enabled: this.toggleVal,
        enabledOnSeries: this.enabledSeries,
        formatter(val, opts) {
          return val + ' €';
        },
      },
      stroke: {
        curve: 'straight',
        width: 3,
      },
      grid: {
        show: true,
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
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
      annotations: {
        yaxis: [
          {
            y: 0,
            strokeDashArray: 0,
            borderColor: '#111',
            borderWidth: 1,
            opacity: 1
          }
        ],
      }
    };
  }

  toggle(item: any) {
    if (typeof item === 'string') {
      this.toggleVal = !this.toggleVal;
    }

    if (typeof item === 'object') {
      if (!item.show) {
        this.enabledSeries.push(item.id);
      } else {
        this.enabledSeries = this.enabledSeries.filter( f => f !== item.id);
      }

      item.show = !item.show;
    }

    this.prepareChart();
  }

}
