import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "../../../../core/services/message.service";
import {NumberingService} from "../../../../core/services/numbering.service";

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
  ]

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
      type: [this.typeDocuments[0].key],
      period: 'YEAR'
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.numberingService.store(this.formGroup.value).subscribe(() => {
      this.router.navigate(['setting/numbering']).then(() => {
        this.messageService.add("číselník bol ulozeny")
      })
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
