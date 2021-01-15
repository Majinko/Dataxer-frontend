import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CRURRENCIES} from '../../../../core/data/currencies';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BankAccountService} from '../../../../core/services/bank-account.service';
import {MessageService} from '../../../../core/services/message.service';

@Component({
  selector: 'app-bank-account-create',
  templateUrl: './bank-account-dialog.component.html',
  styleUrls: ['./bank-account-dialog.component.scss']
})
export class BankAccountDialogComponent implements OnInit {
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
    this.formGroup = this.formBuilder.group({
      id: null,
      iban: [null, Validators.required],
      bankCode: [null, Validators.pattern('^[0-9]*$')],
      bankName: null,
      swift: null,
      accountNumber: [null, Validators.pattern('^[0-9]*$')],
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
}
