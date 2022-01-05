import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LEGALFORMS} from '../../../../core/data/legal-forms';
import {Company} from '../../../../core/models/company';
import {CompanyService} from '../../../../core/services/company.service';
import {Router} from '@angular/router';
import {COUNTRIES} from '../../../../core/data/countries';
import {MatCheckbox} from '@angular/material/checkbox';
import {SlovakiaDigital} from '../../../../core/models/slovakiaDigital';
import {IbanValidator} from '../../../../core/class/validator';
import {ValidatorService} from 'angular-iban';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  public ibanReactive: FormControl;
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
    this.ibanReactive = new FormControl(
      null,
      [
        ValidatorService.validateIban
      ]
    );

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
      iban: this.ibanReactive,
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

   // iban validator
   ibanValidatorMsg(value: string) {
    // tslint:disable-next-line:one-variable-per-declaration
    const countryCode = value.substr(0, 2),
      ibanLenght = IbanValidator.codeLengths[countryCode],
      valueLenght = value.replace(/\s/g, '').length;

    if (ibanLenght && (+ibanLenght - valueLenght !== 0)) {
      return `Dĺžka IBAN pre tuto krajinu je ${ibanLenght} znakov. Zostávajúci počet znakov: ${+ibanLenght - valueLenght}`;
    } else {
      return 'Neplatný IBAN';
    }
  }

  ibanFormat(e) {
    // tslint:disable-next-line:one-variable-per-declaration
    let target = e.target, position = target.selectionEnd, length = target.value.length;
    target.value = target.value.toUpperCase();

    target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    target.selectionEnd = position += ((target.value.charAt(position - 1) === ' '
      && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
  }
}
