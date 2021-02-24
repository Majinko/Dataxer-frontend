import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from '../../../core/services/company.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() showSearchBar = true;


  constructor(public readonly companyService: CompanyService) {
  }

  ngOnInit() {
  }
}
