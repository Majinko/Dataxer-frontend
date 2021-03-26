import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <div>
      <app-menu-tab [navLinks]="navLinks"></app-menu-tab>
      <router-outlet></router-outlet>
    </div>`,
})
export class UserDetailComponent implements OnInit {
  navLinks: { label: string, link: string, index: number }[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.navLinks = [
      {
        label: 'Prehľad',
        link: `/setting/user/show/${this.route.snapshot.paramMap.get('uid')}`,
        index: 0
      },
      {
        label: 'Vývoj mzdy',
        link: `/setting/user/show/salary/${this.route.snapshot.paramMap.get('uid')}`,
        index: 1
      },
      {
        label: 'Čas',
        link: `/setting/user/show/time/${this.route.snapshot.paramMap.get('uid')}`,
        index: 2
      },
    ];
  }
}
