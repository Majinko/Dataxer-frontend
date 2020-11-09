import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NumberingService} from "../../../../core/services/numbering.service";
import {MessageService} from "../../../../core/services/message.service";
import {DocumentNumbering} from "../../../../core/models/documentNumbering";

@Component({
  selector: 'app-numbering-edit',
  templateUrl: './numbering-edit.component.html',
  styleUrls: ['./numbering-edit.component.scss']
})
export class NumberingEditComponent implements OnInit {
  formGroup: FormGroup;
  documentNumbering: DocumentNumbering
  defaultFormat: string[] = ['YYYYNNN', 'YYYYNNNN', 'YYYYNNNNN', 'NNNYYY', 'YYNNNN']
  typeDocuments: { key: string, value: string }[] = [
    {key: 'PRICE_OFFER', value: 'Cenové ponuky'},
    {key: 'INVOICE', value: 'Faktúry'},
    {key: 'PROFORMA', value: 'Zálohové faktúry'}
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private numberingService: NumberingService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.numberingService.getById(+this.route.snapshot.paramMap.get('numbering_id')).subscribe((docNumbering) => {
      this.documentNumbering = docNumbering;

      this.formGroup = this.fb.group({
        id: docNumbering.id,
        title: [docNumbering.title, Validators.required],
        format: docNumbering.format,
        type: docNumbering.type,
        period: docNumbering.period,
        otherFormat: docNumbering.format,
        isDefault: docNumbering.isDefault
      })
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    if (this.f.format.value === 'other' || this.defaultFormat.indexOf(this.f.format.value) === -1){
      this.formGroup.patchValue({format: this.f.otherFormat.value})
    }

    this.numberingService.update(this.formGroup.value).subscribe(() => {
      this.messageService.add("číselník bol aktualizovany")
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
