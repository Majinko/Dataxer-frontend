import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MailTemplateService} from '../../../core/services/mail-template.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Invoice} from '../../../core/models/invoice';
import {MailTemplate} from '../../../core/models/mailTemplate';
import {EDITORCONFIG} from '../../../core/data/editor-config';

@Component({
  selector: 'app-document-email-dialog',
  templateUrl: './document-email-dialog.component.html',
  styleUrls: ['./document-email-dialog.component.scss']
})
export class DocumentEmailDialogComponent implements OnInit {
  formGroup: FormGroup;
  config = EDITORCONFIG;
  mailTemplate: MailTemplate;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DocumentEmailDialogComponent>,
    private mailTemplateService: MailTemplateService,
    @Inject(MAT_DIALOG_DATA) public document: Invoice,
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getTemplate();
  }

  private prepareForm() {
    this.formGroup = this.fb.group({
      subject: null,
      body: null
    });
  }

  private getTemplate() {
    this.mailTemplateService.getByType(this.document.documentType === 'PROFORMA' ? 'PROFORMA' : 'INVOICE').subscribe(template => {
      this.mailTemplate = template;

      this.prepareTpl();
    });
  }

  private prepareTpl() {
    const tags = [];

    tags['#NAZOV'] = this.document.title;
    tags['#CISLO'] = this.document.number;
    tags['#VAR'] = this.document.variableSymbol;
    tags['#SUMA'] = this.document.price;

    for (const [key, value] of Object.entries(tags)) {
      this.mailTemplate.emailSubject = this.mailTemplate.emailSubject.replace(key, value);
      this.mailTemplate.emailContent = this.mailTemplate.emailContent.replace(key, value);
    }

    this.formGroup.patchValue({
      subject: this.mailTemplate.emailSubject,
      body: this.mailTemplate.emailContent
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
