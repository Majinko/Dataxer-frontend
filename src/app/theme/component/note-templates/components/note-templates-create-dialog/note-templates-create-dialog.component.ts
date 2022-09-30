import {Component, Inject, Input, OnInit} from '@angular/core';
import {EDITORCONFIG} from '../../../../../core/data/editor-config';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../../../../../core/services/message.service';

@Component({
  selector: 'app-note-templates-create-dialog',
  templateUrl: './note-templates-create-dialog.component.html',
  styleUrls: ['./note-templates-create-dialog.component.scss']
})
export class NoteTemplatesCreateDialogComponent implements OnInit {
  config = EDITORCONFIG;
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NoteTemplatesCreateDialogComponent>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.formGroup = this.formBuilder.group({
      id: null,
      title: ['', Validators.required],
      note: ''
    });
    if (this.data && this.data.note) {
      this.formGroup.get('note').patchValue(this.data.note);
    }
    if (this.data && this.data.template) {
      this.formGroup.patchValue(this.data.template);
    }
  }

  submit() {
    if (this.formGroup.invalid) {
      this.messageService.add('Prosíme o skontrolovanie povinných údajov');
      return;
    }
    this.dialogRef.close(this.formGroup.value);
  }

  get f() {
    return this.formGroup.controls;
  }
}
