import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchBarService} from '../../../../core/services/search-bar.service';

@Component({
  selector: 'app-project-detail',
  template: `
    <div>
      <app-menu-tab [navLinks]="navLinks"></app-menu-tab>
      <router-outlet></router-outlet>
    </div>`,
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  navLinks: { label: string, link: string, index: number }[] = [];

  constructor(
    private readonly searchBarService: SearchBarService,
    private route: ActivatedRoute
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
  }

  ngOnDestroy(): void {
    this.searchBarService.showBar = true;
  }
}
