import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Todolist} from '../../../../core/models/task';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent implements OnInit {
  formGroup: FormGroup;
  create: string;
  todoLists: Todolist[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.create = this.route.snapshot.paramMap.get('type');
    this.prepareForm();
  }

  prepareForm(): void {
    this.formGroup = this.formBuilder.group({
      title: '',
    });
  }

  drop(event: CdkDragDrop<Todolist[]>) {
    moveItemInArray(this.todoLists, event.previousIndex, event.currentIndex);
    this.todoLists.forEach((todolist, index) => {
      todolist.position = index + 1;
    });
  }

  createTodolist() {
    const todolist = {
      title: this.formGroup.get('title').value,
      position: 1
    };
    this.todoLists.forEach(f => {
      f.position = f.position + 1;
    });
    this.todoLists.unshift(todolist);
    console.log(this.todoLists);
    this.create = null;
  }
}
