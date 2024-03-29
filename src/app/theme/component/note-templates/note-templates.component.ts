import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {EDITORCONFIG} from '../../../core/data/editor-config';
import {MatDialog} from '@angular/material/dialog';
import {
  NoteTemplatesCreateDialogComponent
} from './components/note-templates-create-dialog/note-templates-create-dialog.component';
import {NoteTemplatesDialogComponent} from './components/note-templates-dialog/note-templates-dialog.component';
import {EMAILVARIABLES} from '../../../core/data/mailTemplates';

@Component({
  selector: 'app-note-templates',
  templateUrl: './note-templates.component.html',
  styleUrls: ['./note-templates.component.scss']
})
export class NoteTemplatesComponent implements OnInit {
  config = EDITORCONFIG;
  variables = EMAILVARIABLES;
  moreOptions: boolean = false;

  @Input() formGroup: FormGroup;
  @Input() documentType: string;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  addTemplate() {
    const dialogRef = this.dialog.open(NoteTemplatesCreateDialogComponent, {
      width: '100%',
      maxWidth: '700px',
      data: {
        documentType: this.documentType,
        note: this.formGroup.get('note').value
      },
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log(dialogResult);
        this.formGroup.get('note').patchValue(dialogResult.text);
      }
    });
  }

  getTemplate() {
    const dialogRef = this.dialog.open(NoteTemplatesDialogComponent, {
      width: '100%',
      maxWidth: '1000px',
      data: {
        documentType: this.documentType
      },
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log(dialogResult);
        this.formGroup.get('note').patchValue(dialogResult.text);
      }
    });
  }
}
