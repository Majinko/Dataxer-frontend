import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import {Cost} from '../../../../../../core/models/cost';
import {Invoice} from '../../../../../../core/models/invoice';
import {PriceOffer} from '../../../../../../core/models/priceOffer';
import {numberFormat, sum} from '../../../../../../../helper';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-project-chart',
  templateUrl: './project-chart.component.html',
  styleUrls: ['./project-chart.component.scss']
})
export class ProjectChartComponent implements OnInit {
  @Input() costs: Cost[] = [];
  @Input() invoices: Invoice[] = [];
  @Input() priceOffers: PriceOffer[] = [];

  priceOfferSum: number = 0;
  costPayedSum: number = 0;
  costNotPayedSum: number = 0;
  invoicePayedSum: number = 0;
  invoiceNotPayedSum: number = 0;

  @ViewChild('chart') chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  constructor() {
  }

  ngOnInit(): void {
    this.prepareSum();
    this.prepareChart();
  }

  private prepareSum() {
    this.priceOfferSum = sum(this.priceOffers, 'price');

    this.costPayedSum = sum(this.costs.filter((cost) => cost.paymentDate != null), 'price');
    this.costNotPayedSum = sum(this.costs.filter((cost) => cost.paymentDate === null), 'price');

    this.invoicePayedSum = sum(this.invoices.filter((invoice) => invoice.paymentDate != null), 'price');
    this.invoiceNotPayedSum = sum(this.invoices.filter((invoice) => invoice.paymentDate === null), 'price');
  }

  private prepareChart() {
    this.chartOptions = {
      series: [
        {
          name: 'suma',
          data: [
            this.priceOfferSum,
            this.invoicePayedSum, // invoice payed,
            this.invoicePayedSum, // invoice not payed,
            this.costPayedSum, // cost payed
            this.costNotPayedSum // cost not payed
          ]
        }
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ['Zostáva', 'vyfaktúrovať'],
          ['Fakturácia', 'uhradené'],
          ['Fakturácia', 'neuhradené'],
          ['Náklady', 'uhradené'],
          ['Náklady', 'neuhradené'],
        ],
        labels: {
          style: {
            fontSize: '12px'
          },
          formatter(value: string, timestamp?: number, opts?: any): string | string[] {
            return value;
          }
        }
      },
      yaxis: {
        labels: {
          formatter(val: number): string {
            return numberFormat(val) + ' €';
          }
        }
      },
      tooltip: {
        y: {
          title: {
            formatter(seriesName: string): string {
              return seriesName + ' €';
            }
          }
        },
      },
    };
  }
}
