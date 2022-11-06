import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchBarService} from '../../../../../core/services/search-bar.service';
import {ProjectService} from '../../../../../core/services/project.service';
import {CompanyService} from '../../../../../core/services/company.service';
import {Company} from '../../../../../core/models/company';
import { Project } from 'src/app/core/models/project';

@Component({
  selector: 'app-project-detail',
  template: `
    <div>
      <div class="d-flex align-items-center justify-content-between">
        <h1 *ngIf="project" class="w-35">{{project.title}}</h1>

        <div class="w-75 d-flex justify-content-end align-items-center">
            <button [routerLink]="projectLink" mat-icon-button matTooltip="Upraviť project" class="text-theme">
              <mat-icon>edit</mat-icon>
            </button>
          <!--<div *ngIf="companies && companies.length > 1" style="min-width: 200px">
            <ng-select
              [clearable]="false"
              bindLabel="name"
              bindValue="id"
              placeholder="Spoločnosť"
              [(ngModel)]="selectedCompany"
              (ngModelChange)="getDataByFirm()"
              class="filter-ng-select mt-3">

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
          </div>-->
        </div>
      </div>
      <app-menu-tab [navLinks]="navLinks"></app-menu-tab>
      <router-outlet></router-outlet>
    </div>`,
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project;
  companies: Company[] = [];
  selectedCompany: number = null;
  projectLink: string;
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
    this.projectLink = `/project/edit/${+this.route.snapshot.paramMap.get('id')}`;

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
      },
      {
        label: 'Čas na projekte',
        link: `/project/show/${+this.route.snapshot.paramMap.get('id')}/time-evaluation`,
        index: 3
      },
      {
        label: 'Rozpočet',
        link: `/project/show/${+this.route.snapshot.paramMap.get('id')}/budget`,
        index: 4
      }
    ];

    this.getCompanies();
    this.getProject();
  }

  ngOnDestroy(): void {
    this.searchBarService.showBar = true;
  }

  getProject(){
    this.projectService.getById(+this.route.snapshot.paramMap.get('id')).subscribe((project) => {
      this.project = project;
    })
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
