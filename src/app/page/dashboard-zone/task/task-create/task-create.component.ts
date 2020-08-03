import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../../core/services/category.service";
import {ProjectService} from "../../../../core/services/project.service";
import {Project} from "../../../../core/models/project";
import {CategoryItemNode} from "../../../../core/models/category-item-node";
import {User} from "../../../../core/models/user";
import {UserService} from "../../../../core/services/user.service";
import {TaskService} from "../../../../core/services/task.service";
import {Router} from "@angular/router";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  formGroup: FormGroup

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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();

    this.getUsers();
    this.getProjects();
    this.getCategories();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      project: null,
      category: null,
      user: null,
      state: null,
      sendEmail: true,
      completion: '',
      finishedAt: new Date(),
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

    this.taskService.store(this.formGroup.value).subscribe(() => {
      this.router.navigate(['/task']).then(() => this.messageService.add("Uloha bola pridana"))
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
