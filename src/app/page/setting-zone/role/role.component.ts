import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  template: `
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>`,
})
export class RoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
