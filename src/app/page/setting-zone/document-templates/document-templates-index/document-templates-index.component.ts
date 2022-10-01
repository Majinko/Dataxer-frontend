import { Component, OnInit } from '@angular/core';
import {DocumentTemplatesService} from '../document-templates.service';
import {
  NoteTemplatesCreateDialogComponent
} from '../../../../theme/component/note-templates/components/note-templates-create-dialog/note-templates-create-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-document-templates-index',
  templateUrl: './document-templates-index.component.html',
  styleUrls: ['./document-templates-index.component.scss']
})
export class DocumentTemplatesIndexComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'text',
    'actions',
  ];
  templates = [];

  constructor(
    private dialog: MatDialog,
    private documentTemplatesService: DocumentTemplatesService
  ) { }

  ngOnInit(): void {
    this.getTemplates();
    this.handleUpdateOrStore();
  }

  private getTemplates() {
    this.documentTemplatesService.getAll().subscribe(res => {
      this.templates = res;
    });
  }

  private handleUpdateOrStore() {
    this.documentTemplatesService.storeUpdateSubject.subscribe(() => {
      this.getTemplates();
    });
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
}
