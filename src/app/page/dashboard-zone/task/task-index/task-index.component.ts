import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Todolist} from '../../../../core/models/task';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent implements OnInit {
  todolists: Todolist[] = [
    {
      id: 1,
      title: 'toto treba'
    },
    {
      id: 2,
      title: 'toto treba tiež'
    },
    {
      id: 3,
      title: 'toto treba určite'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Todolist[]>) {
    moveItemInArray(this.todolists, event.previousIndex, event.currentIndex);
  }
}
