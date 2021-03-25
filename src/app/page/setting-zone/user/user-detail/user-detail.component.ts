import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.navLinks = [];
  }

}
