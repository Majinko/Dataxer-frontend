import {Component, Inject, OnInit} from '@angular/core';
import {Company} from '../../../../core/models/company';
import {CompanyService} from '../../../../core/services/company.service';
import {MessageService} from '../../../../core/services/message.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

      this.messageService.add('Spoločnosť bola odstránená.');
    }, error => {
      this.messageService.add(error.error.message);
    });
  }

  drop(event: CdkDragDrop<Company[]>) {
    moveItemInArray(this.companies, event.previousIndex, event.currentIndex);
    this.companies.forEach((company, index) => {
      company.position = index;
    });

    this.companyService.updatePosition(this.companies).subscribe(() => {
      this.messageService.add('Spoločnosti boli aktualizované.');
    });
  }
}
