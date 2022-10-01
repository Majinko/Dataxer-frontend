import {Component, Inject, OnInit} from '@angular/core';
import {
  NoteTemplatesCreateDialogComponent
} from '../note-templates-create-dialog/note-templates-create-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DocumentTemplatesService} from '../../../../../page/setting-zone/document-templates/document-templates.service';

@Component({
  selector: 'app-note-templates-dialog',
  templateUrl: './note-templates-dialog.component.html',
  styleUrls: ['./note-templates-dialog.component.scss']
})
export class NoteTemplatesDialogComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'text',
    'actions',
  ];
  templates = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NoteTemplatesDialogComponent>,
    private dialog: MatDialog,
    private documentTemplatesService: DocumentTemplatesService
  ) { }

  ngOnInit(): void {
    this.getTemplates();
  }

  openNote(template, type: string) {
    const dialogRef = this.dialog.open(NoteTemplatesCreateDialogComponent, {
      width: '100%',
      maxWidth: '700px',
      data: {
        template,
        type
      },
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log(dialogResult);
      }
    });
  }

  setTemplate(template) {
    this.dialogRef.close(template);
  }

  private getTemplates() {
    this.documentTemplatesService.findByDocumentType(this.data.documentType).subscribe(res => {
      console.log('type');
      console.log(res);
      this.templates = res;
    });
  }
}
