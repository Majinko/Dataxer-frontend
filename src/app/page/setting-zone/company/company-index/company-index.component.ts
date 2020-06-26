import {Component, Inject, OnInit} from '@angular/core';
import {Company} from '../../../../core/models/company';
import {CompanyService} from '../../../../core/services/company.service';

@Component({
  selector: 'app-index',
  templateUrl: './company-index.component.html',
  styleUrls: ['./company-index.component.scss']
})
export class CompanyIndexComponent implements OnInit {
  companies: Company[] = [];

  constructor(
    @Inject(CompanyService) private readonly companyService: CompanyService,
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    return this.companyService.all().subscribe(c => this.companies = c);
  }
}
