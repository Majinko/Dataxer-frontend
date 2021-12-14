import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexAnnotations, ApexLegend } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: any;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  tooltip: any;
  annotations: ApexAnnotations;
};

@Component({
  selector: 'app-overview-profit-chart',
  templateUrl: './overview-profit-chart.component.html',
  styleUrls: ['./overview-profit-chart.component.scss']
})
export class OverviewProfitChartComponent implements OnInit {
  @ViewChild('chart') chart: OverviewProfitChartComponent;
  public chartOptions: Partial<ChartOptions>;
  costs;
  contracts;
  profit = [];
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
    {
      id: 3,
      show: true
    }
  ];
  enabledSeries = [0, 1, 2, 3];
  manhour = [50, 25, 37, 64, 19, 100, 86, 45, 99, 78, 32, 55];
  skMonths: string[] = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];
  toggleVal = false;

  @Input() costsOverview;


  constructor() {
  }

  ngOnInit(): void {
    this.contracts = Object.values(this.costsOverview.categoryMonthsCostsDTOS[0].totalMonthsCosts);
    this.costs = Object.values(this.costsOverview.categoryMonthsCostsDTOS[1].totalMonthsCosts);
    this.skMonths.forEach((graph, index) => {
      if (!this.contracts[index]) {
        this.contracts[index] = 0;
      }
      if (!this.costs[index]) {
        this.costs[index] = 0;
      } else {
        this.costs[index] = this.costs[index] * -1;
      }
      const profit = this.contracts[index] + this.costs[index];
      this.profit[index] = profit.toFixed(2);
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
          name: 'Zisk',
          data: this.profit
        },
        {
          name: 'Človekohodina',
          data: this.manhour
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: this.toggleVal,
        enabledOnSeries: this.enabledSeries,
        formatter(val, opts) {
          if (opts.seriesIndex === 3) {
            return val + ' h';
          } else {
            return val + ' €';
          }
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
      yaxis: [
        {
          seriesName: 'Zákazky',
          labels: {
            formatter(val: number): string {
              return val + ' €';
            }
          }
        },
        {
          seriesName: 'Zákazky',
          show: false,
          labels: {
            formatter(val: number): string {
              return val + ' €';
            }
          }
        },
        {
          seriesName: 'Zákazky',
          show: false,
          labels: {
            formatter(val: number): string {
              return val + ' €';
            }
          }
        },
        {
          opposite: true,
          seriesName: 'TEAM B',
          labels: {
            formatter(val: number): string {
              return val + ' hodín';
            }
          }
        }
      ],
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
        this.enabledSeries = this.enabledSeries.filter(f => f !== item.id);
      }

      item.show = !item.show;
    }

    this.prepareChart();
  }
}
