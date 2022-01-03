import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-element-paid-state',
  templateUrl: './element-paid-state.component.html',
  styleUrls: ['./element-paid-state.component.scss']
})
export class ElementPaidStateComponent implements OnInit {
  @Input() isPaid: boolean;
  @Input() dueAtDays: number;

  @Input() price: number = 0;
  @Input() sumPayments: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
