import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-element-paid-state',
  templateUrl: './element-paid-state.component.html',
  styleUrls: ['./element-paid-state.component.scss']
})
export class ElementPaidStateComponent implements OnInit {
  @Input() isPaid: boolean;
  @Input() dueAtDays: number;

  constructor() { }

  ngOnInit(): void {
  }

}
