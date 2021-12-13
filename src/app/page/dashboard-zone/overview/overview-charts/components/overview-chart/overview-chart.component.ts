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
  aaa;
  bbb;
  ccc

  @Input() costsOverview;

  constructor() {
  }

  ngOnInit(): void {
    console.log('aaa');
    console.log(this.costsOverview);
    this.costs = Object.values(this.costsOverview.monthsTotalCosts)
    console.log(this.costsOverview.categoryMonthsCostsDTOS[1].totalMonthsCosts);
    this.aaa = Object.values(this.costsOverview.categoryMonthsCostsDTOS[0].totalMonthsCosts)
    this.bbb = Object.values(this.costsOverview.categoryMonthsCostsDTOS[1].totalMonthsCosts)
    this.ccc = Object.values(this.costsOverview.categoryMonthsCostsDTOS[2].totalMonthsCosts)
    console.log(this.bbb);
    console.log('aaasaf');
    console.log(this.ccc);
    if (this.ccc.lenght != 12) {
      console.log('aaaaaaaa');
    }



    for (const [key, value] of Object.entries(this.costsOverview.categoryMonthsCostsDTOS[2].totalMonthsCosts)) {
      console.log('bbbb');
      console.log(key, value);
    }


    this.prepareChart();
  }

  private prepareChart(){
    this.chartOptions = {
      series: [
        {
          name: 'Zákazky',
          data: this.aaa
        },
        {
          name: 'Firemné náklady',
          data: this.bbb
        },
        {
          name: 'Mzdy architekti ',
          data: this.ccc
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          'Okt',
          'Nov',
          'Dec'
        ],
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
