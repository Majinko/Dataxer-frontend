import { Component, OnInit } from '@angular/core';
import {Todolist} from '../../../../../core/models/task';

@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.scss']
})
export class TaskShowComponent implements OnInit {

  todolist: Todolist =  {
     id: 1,
     title: 'toto treba',
     position: 1,
    }
  ;

  constructor() { }

  ngOnInit(): void {
  }

}
