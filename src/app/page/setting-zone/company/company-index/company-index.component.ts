import {Component, Inject, OnInit} from '@angular/core';
import {Company} from '../../../../core/models/company';
import {CompanyService} from '../../../../core/services/company.service';
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-index',
  templateUrl: './company-index.component.html',
  styleUrls: ['./company-index.component.scss']
})
export class CompanyIndexComponent implements OnInit {
  companies: Company[] = [];

  constructor(
    @Inject(CompanyService) private readonly companyService: CompanyService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    return this.companyService.all().subscribe(c => this.companies = c);
  }

  deleteCompany(id: number) {
    this.companyService.destroy(id).subscribe(() => {
      this.companies = this.companies.filter(company => company.id !== id);

      this.messageService.add("spolocnost bola delete")
    }, error => {
      this.messageService.add(error.error.message);
    });
  }
}
