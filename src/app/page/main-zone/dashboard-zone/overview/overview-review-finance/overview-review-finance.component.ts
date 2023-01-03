import {Component, OnInit, ViewChild} from '@angular/core';
import {OverviewService} from '../../../../../core/services/overview.service';
import {CostService} from '../../../../../core/services/cost.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-overview-review-finance',
  templateUrl: './overview-review-finance.component.html',
  styleUrls: ['./overview-review-finance.component.scss']
})
export class OverviewReviewFinanceComponent implements OnInit {
  isLoad: boolean = true;
  isLoadAdditionalData: boolean = false;
  months: number[] = new Array(12);
  year: number = 2022; // new Date().getFullYear();
  years: number[] = [];
  reviewFinance = [];
  additionalData;
  toogleAccord = false;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private costService: CostService,
    private overviewService: OverviewService
  ) {
  }

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
    this.isLoad = true;
    this.overviewService.getReviewFinance(this.year).subscribe(response => {
      this.isLoad = false;
      this.reviewFinance = response;
      console.log(response[0])
      setTimeout(() => {
        this.accordion.openAll();
      }, 1);
    });
    this.isLoadAdditionalData = false;
    this.overviewService.getReviewFinanceAdditionalData(this.year).subscribe(response => {
      this.additionalData = response;
      this.isLoadAdditionalData = true;
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
      this.reviewFinance.forEach(f => {
        f.showed = false;
      });
      this.accordion.closeAll();
    } else {
      this.toogleAccord = true;
      this.reviewFinance.forEach(f => {
        f.showed = true;
      });
      this.accordion.openAll();
    }
  }
}
