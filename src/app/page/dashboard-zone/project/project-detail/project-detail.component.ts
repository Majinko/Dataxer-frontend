import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchBarService} from '../../../../core/services/search-bar.service';
import {ProjectService} from '../../../../core/services/project.service';
import {CompanyService} from '../../../../core/services/company.service';
import {Company} from '../../../../core/models/company';

@Component({
  selector: 'app-project-detail',
  template: `
    <div>
      <div class="d-flex justify-content-end" *ngIf="companies && companies.length > 1">

        <div class="col-md-4 col-lg-2">
          <ng-select
                     [clearable]="false"
                     bindLabel="name"
                     bindValue="id"
                     placeholder="Spoločnosť"
                     [(ngModel)]="selectedCompany"
                     (ngModelChange)="getDataByFirm()"
                     class="filter-ng-select">

            <ng-option *ngFor="let company of companies" [value]="company">
              <div class="company-option">
                <div class="img-wrap">
                  <img *ngIf="company.logoUrl" [src]="company.logoUrl" size="40" alt="company.name">
                </div>
                <div class="text-wrap">
                  {{ company.name }}
                </div>
              </div>
            </ng-option>
          </ng-select>
        </div>
      </div>
      <app-menu-tab [navLinks]="navLinks"></app-menu-tab>
      <router-outlet></router-outlet>
    </div>`,
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  selectedCompany: number = null;
  navLinks: { label: string, link: string, index: number }[] = [];

  constructor(
    private readonly searchBarService: SearchBarService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.searchBarService.showBar = false;

    this.navLinks = [
      {
        label: 'Prehľad',
        link: `/project/show/${+this.route.snapshot.paramMap.get('id')}`,
        index: 0
      },
      {
        label: 'Vyhodnotenie',
        link: `/project/show/${+this.route.snapshot.paramMap.get('id')}/evaluation`,
        index: 1
      },
      {
        label: 'Kategórie',
        link: `/project/show/${+this.route.snapshot.paramMap.get('id')}/category-evaluation`,
        index: 2
      }
    ];

    this.getCompanies();
  }

  ngOnDestroy(): void {
    this.searchBarService.showBar = true;
  }

  getCompanies() {
    this.companyService.all().subscribe((c) => {
      this.companies = c;
    });
  }

  getDataByFirm() {
    const ids: number[] = [];
    ids.push(this.selectedCompany);

    this.projectService.getInfoFromCompany.next(ids);
  }
}
