import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-document-pack-title-dialog',
  templateUrl: './document-pack-title-dialog.component.html',
  styleUrls: ['./document-pack-title-dialog.component.scss']
})
export class DocumentPackTitleDialogComponent implements OnInit {
  options = [
    {
      id: 1,
      title: 'Kategória',
      value: 'category'
    },
    {
      id: 2,
      title: 'Kód',
      value: 'code'
    },
    {
      id: 3,
      title: 'Výrobca',
      value: 'manufacturer'
    },
    {
      id: 4,
      title: 'Model',
      value: 'model'
    },
    {
      id: 5,
      title: 'Typ',
      value: 'type'
    },
    {
      id: 6,
      title: 'Farba',
      value: 'color'
    }
  ];
  done = [];

  constructor(
    public dialogRef: MatDialogRef<DocumentPackTitleDialogComponent>,
  ) { }

  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  save() {
    console.log('save');
    this.dialogRef.close(this.done);
  }
}
