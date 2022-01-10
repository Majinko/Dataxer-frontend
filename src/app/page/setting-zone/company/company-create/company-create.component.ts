import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LEGALFORMS} from '../../../../core/data/legal-forms';
import {Company} from '../../../../core/models/company';
import {CompanyService} from '../../../../core/services/company.service';
import {Router} from '@angular/router';
import {COUNTRIES} from '../../../../core/data/countries';
import {MatCheckbox} from '@angular/material/checkbox';
import {SlovakiaDigital} from '../../../../core/models/slovakiaDigital';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  formGroup: FormGroup;
  legalForms = LEGALFORMS;
  countries = COUNTRIES;
  isSubmit: boolean = false;
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

  setFirmData(firm: SlovakiaDigital) {
    this.formGroup.patchValue({
      name: firm.name,
      legalForm: firm.legal_form,
      street: firm.formatted_street,
      country: firm.country,
      city: firm.municipality,
      postalCode: firm.postal_code,
      cin: firm.cin,
      tin: firm.tin,
      vatin: firm.vatin
    });
  }

  onSubmit(companyFormData: Company) {
    this.isSubmit = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.companyService.store(companyFormData).subscribe(company => this.router.navigate(['/setting/company']));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  get bI() {
    return this.f.billingInformation as FormArray;
  }
}
