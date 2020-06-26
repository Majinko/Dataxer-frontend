import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CompanyService} from '../../../../core/services/company.service';
import {Company} from '../../../../core/models/company';
import {ActivatedRoute} from '@angular/router';
import {LEGALFORMS} from '../../../../core/data/legal-forms';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COUNTRIES} from '../../../../core/data/countries';
import {BillingInformation} from '../../../../core/models/billing-information';
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  company: Company;
  formGroup: FormGroup;
  countries = COUNTRIES;
  legalForms = LEGALFORMS;
  @ViewChild('bInfo', {static: false}) bInfo: MatCheckbox;

  constructor(
    @Inject(CompanyService) private readonly companyService: CompanyService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getById();
  }

  getById() {
    return this.companyService.getById(+this.route.snapshot.paramMap.get('company_id')).subscribe(c => {
        this.company = c;

        this.formGroup = this.fb.group({
          id: c.id,
          name: [c.name, Validators.required],
          legalForm: [c.legalForm, Validators.required],
          street: c.street,
          city: c.city,
          postalCode: c.postalCode,
          country: c.country,
          email: c.email,
          phone: c.phone,
          web: c.web,
          identifyingNumber: c.identifyingNumber,
          vat: c.vat,
          netOfVat: c.netOfVat,
          iban: c.iban,
          billingInformation: this.fb.array([this.createBillingInformation(c.billingInformation)])
        });

        if (c.billingInformation.length) {
          this.formGroup.get('billingInformation').setValue(c.billingInformation);
        }
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  get bI() {
    return this.f.billingInformation as FormArray;
  }

  onSubmit(companyFormData: Company) {
    if (this.formGroup.invalid) {
      return;
    }

    if (this.bInfo.checked) {
      delete companyFormData.billingInformation;
    }

    this.companyService.update(companyFormData, companyFormData.id).subscribe();
  }

  private createBillingInformation(billingInformation: BillingInformation[]): FormGroup {
    return this.fb.group({
      id: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
    });
  }
}
