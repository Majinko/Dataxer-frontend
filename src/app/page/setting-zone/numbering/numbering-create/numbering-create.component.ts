import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from '../../../../core/services/message.service';
import {NumberingService} from '../../../../core/services/numbering.service';

@Component({
  selector: 'app-numbering-create',
  templateUrl: './numbering-create.component.html',
  styleUrls: ['./numbering-create.component.scss']
})
export class NumberingCreateComponent implements OnInit {
  formGroup: FormGroup;
  typeDocuments: { key: string, value: string }[] = [
    {key: 'PRICE_OFFER', value: 'Cenové ponuky'},
    {key: 'INVOICE', value: 'Faktúry'},
    {key: 'PROFORMA', value: 'Zálohové faktúry'}
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private numberingService: NumberingService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: [null, Validators.required],
      format: 'YYYYCCC',
      otherFormat: '',
      company: [null, Validators.required],
      type: [this.typeDocuments[0].key],
      period: 'YEAR',
      isDefault: true
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    if (this.f.format.value === 'other') {
      this.formGroup.patchValue({format: this.f.otherFormat.value});
    }

    this.numberingService.store(this.formGroup.value).subscribe(() => {
      this.router.navigate(['setting/numbering']).then(() => {
        this.messageService.add('Číselník bol uložený');
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
