import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CRURRENCIES} from '../../../../core/data/currencies';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {MessageService} from '../../../../core/services/message.service';
import { ValidatorService } from 'angular-iban';
import {IbanValidator} from '../../../../core/class/validator';

@Component({
  selector: 'app-bank-account-create',
  templateUrl: './bank-account-dialog.component.html',
  styleUrls: ['./bank-account-dialog.component.scss']
})
export class BankAccountDialogComponent implements OnInit {
  public ibanReactive: FormControl;
  formGroup: FormGroup;
  currencies = CRURRENCIES;

  constructor(
    public dialogRef: MatDialogRef<BankAccountDialogComponent>,
    private formBuilder: FormBuilder,
    private bankAccountService: BankAccountService,
    private readonly messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.ibanReactive = new FormControl(
      null,
      [
        Validators.required,
        ValidatorService.validateIban
      ]
    );

    this.formGroup = this.formBuilder.group({
      id: null,
      iban: this.ibanReactive,
      bankCode: [null, Validators.pattern('^[0-9]{1,6}$')],
      bankName: null,
      swift: null,
      accountNumber: [null, Validators.pattern('^[0-9]{1,10}$')],
      currency: this.currencies[0].value,
    });

    if (this.data && this.data.bankAccount) {
      this.formGroup.patchValue(this.data.bankAccount);
    }
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    if (this.data && this.data.bankAccount) {
      this.bankAccountService.update(this.formGroup.value).subscribe((bankAccount) => {
        this.dialogRef.close();

        this.bankAccountService.accountChanges.next(bankAccount);
        this.messageService.add('Bankový účet bol aktualizovaní');
      });
    } else {
      this.bankAccountService.store(this.formGroup.value).subscribe((bankAccount) => {
        this.dialogRef.close();

        this.bankAccountService.accountChanges.next(bankAccount);
        this.messageService.add('Bankový účet bol uložený a nastavení ako defaultny');
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
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
