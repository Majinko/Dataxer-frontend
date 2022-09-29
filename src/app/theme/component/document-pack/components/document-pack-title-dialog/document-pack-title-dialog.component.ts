import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-document-pack-title-dialog',
  templateUrl: './document-pack-title-dialog.component.html',
  styleUrls: ['./document-pack-title-dialog.component.scss']
})
export class DocumentPackTitleDialogComponent implements OnInit {
  todo = ['Kategória', 'Kód', 'Výrobca', 'Model', 'Typ'];
  done = [];

  constructor() { }

  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<string[]>) {
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
  }
}
