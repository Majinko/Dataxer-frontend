import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company-setting',
  template: `
    <div>
      <app-menu-tab [navLinks]="navLinks"></app-menu-tab>
      <div class="row mt-3">
        <div class="col">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>`,
})
export class CompanySettingComponent implements OnInit {
  navLinks: { label: string, link: string, index: number }[] = [];

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.navLinks = [
      {
        label: 'Nastavenia času',
        link: `/setting/company-setting/time`,
        index: 0
      },
    ];
  }

}
