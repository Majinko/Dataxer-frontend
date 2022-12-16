import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OverviewService} from '../../../../../core/services/overview.service';
import {CostService} from '../../../../../core/services/cost.service';
import {MatAccordion} from '@angular/material/expansion';
import {CategoryCostsOverview} from '../../../../../core/models/overview';

@Component({
  selector: 'app-overview-review-finance',
  templateUrl: './overview-review-finance.component.html',
  styleUrls: ['./overview-review-finance.component.scss']
})
export class OverviewReviewFinanceComponent implements OnInit {
  isLoad: boolean = true;
  months: number[] = new Array(12);
  year: number = new Date().getFullYear();
  years: number[] = [];
  reviewFinance = [];
  toogleAccord = true;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private costService: CostService,
    private overviewService: OverviewService
  ) { }

  ngOnInit(): void {
    this.getYears();
    this.getData();
  }

  getYears(): void {
    this.costService.getCostsYears().subscribe(years => {
      this.years = years;
    });
  }

  getData() {
    this.overviewService.getReviewFinance(this.year).subscribe(response => {
      this.isLoad = false;
      this.reviewFinance = response;
      setTimeout(() => {
        this.accordion.openAll();
      }, 1);
    });
  }

  toggle(panel: any, item: any) {
    if (item.showed) {
      item.showed = false;
      panel.closeAll();
    } else {
      item.showed = true;
      panel.openAll();
    }

  }

  toggleAccord() {
    if (this.toogleAccord) {
      this.toogleAccord = false;
      this.reviewFinance.forEach( f => {
        f.showed = false;
      })
      this.accordion.closeAll();
    } else {
      this.toogleAccord = true;
      this.reviewFinance.forEach( f => {
        f.showed = true;
      })
      this.accordion.openAll();
    }
  }
}
