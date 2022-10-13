import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';
import {TodoProject} from '../../../../../core/models/task';

@Component({
  selector: 'app-todo-project-guide',
  templateUrl: './todo-project-guide.component.html',
  styleUrls: ['./todo-project-guide.component.scss']
})
export class TodoProjectGuideComponent implements OnInit {
  create = false;
  projects: TodoProject[] = [];

  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.getProjects();
    this.todoService.closeSubject.subscribe(() => {
      this.create = false;
    });
  }

  private getProjects() {
    this.todoService.groupByProject().subscribe((projects) => {
      projects.forEach( item => {
        item.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      });
      this.projects = projects;
    });
  }

  openNewList() {
    this.create = true;
  }
}
