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
        label: 'Mzda',
        link: `/setting/user/show/${this.route.snapshot.paramMap.get('uid')}/salary`,
        index: 1
      },
      {
        label: 'Projektový prehľad',
        link: `/setting/user/show/${this.route.snapshot.paramMap.get('uid')}/project-overview`,
        index: 2
      },
      {
        label: 'Čas',
        link: `/setting/user/show/${this.route.snapshot.paramMap.get('uid')}/time`,
        index: 3
      },
    ];
  }
}
