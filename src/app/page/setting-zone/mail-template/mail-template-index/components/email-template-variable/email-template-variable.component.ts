import {Component, OnInit} from '@angular/core';
import {EMAILVARIABLES} from '../../../../../../core/data/mailTemplates';

@Component({
  selector: 'app-email-template-variable',
  templateUrl: './email-template-variable.component.html',
  styleUrls: ['./email-template-variable.component.scss']
})
export class EmailTemplateVariableComponent implements OnInit {
  variables = EMAILVARIABLES;

  constructor() {
  }

  ngOnInit(): void {
  }

}
