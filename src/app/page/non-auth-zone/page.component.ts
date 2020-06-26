import {Component} from '@angular/core';

@Component({
  selector: 'app-page',
  template: `
    <app-message></app-message>
    <router-outlet></router-outlet>
  `,
})
export class PageComponent {
  constructor() {
  }
}
