import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormGroupDirective, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Company} from '../../../core/models/company';
import {CompanyService} from '../../../core/services/company.service';
import {CompanyCreateComponent} from '../../../page/setting-zone/company/company-create/company-create.component';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-company-select-group',
  templateUrl: './company-select-group.component.html',
  styleUrls: ['./company-select-group.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CompanySelectGroupComponent),
    multi: true
  }]
})
export class CompanySelectGroupComponent implements OnInit {
  companies: Company[] = [];

  @Input() showAddButton: boolean = true;
  @Input() ngForm: FormGroupDirective;
  @Input() company: Company;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public companyService: CompanyService,
  ) {
  }

  onTouched = () => {
  }
  onChange = _ => {
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.all().subscribe(companies => {
      this.companies = companies;

      // this.route.snapshot.paramMap.get('id') === null
      // when is this null, invoice is not create from another invoice, then is company set from another invoice not first
      if (!this.ngForm.form.controls.company.value && this.route.snapshot.paramMap.get('id') === null) {
        setTimeout(() => {
          this.company = this.companies[0];
          this.onChange(this.company);
        }, 1);
      }
    });
  }

  openDialog() {
    this.dialog.open(CompanyCreateComponent, {
      data: {inModal: true},
      autoFocus: false
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(company: Company) {
    this.company = company;
  }

  selectCompany(company: Company) {
    this.onChange(company);
  }
}
