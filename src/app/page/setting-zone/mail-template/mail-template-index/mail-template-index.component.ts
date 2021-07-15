import {Component, OnInit} from '@angular/core';
import {MailTemplateService} from '../../../../core/services/mail-template.service';
import {MailTemplate} from '../../../../core/models/mailTemplate';
import {DEFAULTMAILTEMPLATES} from '../../../../core/data/mailTemplates';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {EDITORCONFIG} from '../../../../core/data/editor-config';
import {MessageService} from '../../../../core/services/message.service';

@Component({
  selector: 'app-mail-template-index',
  templateUrl: './mail-template-index.component.html',
  styleUrls: ['./mail-template-index.component.scss']
})
export class MailTemplateIndexComponent implements OnInit {
  config = EDITORCONFIG;
  formGroup: FormGroup;
  isLoading: boolean = true;
  defaultMailTemplates: MailTemplate[] = DEFAULTMAILTEMPLATES;

  constructor(
    private formBuilder: FormBuilder,
    private mailTemplateService: MailTemplateService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.fillForm();
    this.getAll();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      mailTemplates: this.formBuilder.array([])
    });
  }

  private fillForm() {
    for (let i = 0; i < this.defaultMailTemplates.length; i++) {
      this.templates().push(this.template(this.defaultMailTemplates[i]));
    }
  }

  template(mailTemplate: MailTemplate): FormGroup {
    return this.formBuilder.group({
      id: null,
      mailTemplateType: mailTemplate.mailTemplateType,
      emailSubject: mailTemplate.emailSubject,
      emailContent: mailTemplate.emailContent
    });
  }

  templates(): FormArray {
    return this.formGroup.get('mailTemplates') as FormArray;
  }

  getAll() {
    return this.mailTemplateService.getAll().subscribe((res) => {
      this.isLoading = false;

      if (res) {
        this.formGroup.patchValue({
          mailTemplates: res
        });
      }
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.mailTemplateService.storeAll(this.formGroup.get('mailTemplates').value).subscribe(res => {
      this.messageService.add('Šablóny boli uložené');

      this.formGroup.patchValue({
        mailTemplates: res
      });
    });
  }
}
