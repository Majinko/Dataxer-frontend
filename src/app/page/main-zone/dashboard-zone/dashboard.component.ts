import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page',
  template: `
    <router-outlet></router-outlet>`,
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.router.navigate(['/paginate/time']).then();
    }
  }
}
