import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-pie-chart',
  templateUrl: './todo-pie-chart.component.html',
  styleUrls: ['./todo-pie-chart.component.scss']
})
export class TodoPieChartComponent implements OnInit {

  @Input() percent: number;

  constructor() { }

  ngOnInit(): void {
  }

}
