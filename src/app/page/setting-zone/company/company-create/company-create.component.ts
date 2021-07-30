import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LEGALFORMS} from '../../../../core/data/legal-forms';
import {Company} from '../../../../core/models/company';
import {CompanyService} from '../../../../core/services/company.service';
import {Router} from '@angular/router';
import {COUNTRIES} from '../../../../core/data/countries';
import {MatCheckbox} from '@angular/material/checkbox';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  formGroup: FormGroup;
  legalForms = LEGALFORMS;
  countries = COUNTRIES;
  @ViewChild('bInfo', {static: true}) bInfo: MatCheckbox;

  constructor(
    @Inject(CompanyService) private readonly companyService: CompanyService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      legalForm: ['', Validators.required],
      companyTaxType: ['', Validators.required],
      logoUrl: '',
      signatureUrl: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      email: '',
      phone: '',
      web: '',
      cin: '',
      tin: '',
      vatin: '',
      iban: '',
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  get bI() {
    return this.f.billingInformation as FormArray;
  }

  onSubmit(companyFormData: Company) {
    return;

    if (this.formGroup.invalid) {
      return;
    }

    this.companyService.store(companyFormData).subscribe(company => this.router.navigate(['/setting/company']));
  }

  private createBillingInformation(): FormGroup {
    return this.fb.group({
      street: '',
      city: '',
      postalCode: '',
      country: '',
    });
  }
}
