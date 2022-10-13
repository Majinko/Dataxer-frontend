import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../../../../core/services/todo.service';
import {TodoProject} from '../../../../../core/models/task';

@Component({
  selector: 'app-todo-project-guide',
  templateUrl: './todo-project-guide.component.html',
  styleUrls: ['./todo-project-guide.component.scss']
})
export class TodoProjectGuideComponent implements OnInit {
  projects: TodoProject[] = [];

  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects() {
    this.todoService.groupByProject().subscribe((projects) => {
      console.log(projects);
      projects.forEach( item => {
        item.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      });
      this.projects = projects;
    });
  }
}
