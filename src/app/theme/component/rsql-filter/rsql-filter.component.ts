import {Component, OnInit} from '@angular/core';
import {parse} from '@rsql/parser';
import {getSelector, getValue, isComparisonNode} from '@rsql/ast';
import { emit } from '@rsql/emitter';
import builder from '@rsql/builder';

@Component({
  selector: 'app-rsql-filter',
  templateUrl: './rsql-filter.component.html',
  styleUrls: ['./rsql-filter.component.scss']
})
export class RsqlFilterComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    const expression = parse('year>=2003');

    if (isComparisonNode(expression)) {
      console.log(`Selector: ${getSelector(expression)}`);
      // > Selector: year
      console.log(`Operator: ${expression.operator}`);
      // > Operator: >=
      console.log(`Value: ${getValue(expression)}`);
      // > Value: 2003
    }
  }
}
