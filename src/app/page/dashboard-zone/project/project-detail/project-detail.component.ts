import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  template: `<div><router-outlet></router-outlet></div>`,
})
export class ProjectDetailComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
