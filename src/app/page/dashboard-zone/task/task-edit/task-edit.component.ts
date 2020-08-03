import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../core/models/user";
import {Project} from "../../../../core/models/project";
import {CategoryItemNode} from "../../../../core/models/category-item-node";
import {Task} from "../../../../core/models/task";
import {CategoryService} from "../../../../core/services/category.service";
import {ProjectService} from "../../../../core/services/project.service";
import {UserService} from "../../../../core/services/user.service";
import {TaskService} from "../../../../core/services/task.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  formGroup: FormGroup

  task: Task;
  users: User[] = [];
  projects: Project[] = [];
  categories: CategoryItemNode[] = []

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private userService: UserService,
    private taskService: TaskService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();

    this.getUsers();
    this.getProjects();
    this.getCategories();
  }

  private prepareForm() {
    this.taskService.getById(+this.route.snapshot.paramMap.get('task_id')).subscribe(t => {
      this.task = t;

      this.formGroup = this.formBuilder.group({
        id: t.id,
        title: [t.title, Validators.required],
        description: t.description,
        project: t.project,
        category: t.category,
        user: t.user,
        userFrom: t.userFrom,
        state: t.state,
        completion: t.completion,
        finishedAt: t.finishedAt,
      })
    })
  }

  private getProjects() {
    this.projectService.all().subscribe((p) => this.projects = p);
  }

  private getCategories() {
    this.categoryService.all().subscribe((c) => this.categories = c);
  }

  private getUsers() {
    return this.userService.all().subscribe((u) => this.users = u);
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.taskService.update(this.formGroup.value).subscribe(() => {
      this.messageService.add("Uloha bola upravena")
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
