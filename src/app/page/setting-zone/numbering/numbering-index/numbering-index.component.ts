import {Component, OnInit, ViewChild} from '@angular/core';
import {Company} from '../../../../core/models/company';
import {DocumentNumbering} from '../../../../core/models/documentNumbering';
import {MatPaginator} from '@angular/material/paginator';
import {NumberingService} from '../../../../core/services/numbering.service';
import {MessageService} from '../../../../core/services/message.service';
import {CompanyService} from '../../../../core/services/company.service';

@Component({
  selector: 'app-numbering-index',
  templateUrl: './numbering-index.component.html',
})
export class NumberingIndexComponent implements OnInit {
  companies: Company[] = [];
  selectedCompanyId: number = null;

  documentNumberings: DocumentNumbering[] = [];
  filteredDocumentNumberings: DocumentNumbering[] = [];
  displayedColumns: string[] = [
    'title',
    'type',
    'format',
    'next',
    'period',
    'actions',
  ];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private numberingService: NumberingService,
    private messageService: MessageService,
    private companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies() {
    this.companyService.all().subscribe((companies) => {
      this.companies = companies;

      this.getNumberings(this.companies[0].id);
      this.selectedCompanyId = this.companies[0].id;
    });
  }

  private getNumberings(id: number) {
    this.numberingService.getAll().subscribe((documentNumberings) => {
      this.documentNumberings = documentNumberings;

      this.filteredDocumentNumberings = documentNumberings.filter((documentNumber) => documentNumber.company.id === id);
    });
  }

  destroy(id: number) {
    this.numberingService.destroy(id).subscribe(r => {

      this.messageService.add('Ciselnik bol zmazany');
    });
  }

  getNumberingByFirm() {
    this.filteredDocumentNumberings = this
      .documentNumberings
      .filter((documentNumber) => documentNumber.company.id === this.selectedCompanyId);
  }
}
