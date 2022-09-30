import { Component, OnInit } from '@angular/core';
import {
  NoteTemplatesCreateDialogComponent
} from "../note-templates-create-dialog/note-templates-create-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-note-templates-dialog',
  templateUrl: './note-templates-dialog.component.html',
  styleUrls: ['./note-templates-dialog.component.scss']
})
export class NoteTemplatesDialogComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'note',
    'actions',
  ];
  templates = [
    {
      id: 1,
      title: 'test1',
      note: 'Dakujeme'
    },
    {
      id: 2,
      title: 'test2',
      note: 'Dakujeme pekne'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<NoteTemplatesDialogComponent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
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
}
