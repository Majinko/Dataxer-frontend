import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryItemNode} from "../../../../core/models/category-item-node";
import {CategoryService} from "../../../../core/services/category.service";
import {MessageService} from "../../../../core/services/message.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../../../core/services/project.service";
import {User} from "../../../../core/models/user";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  formGroup: FormGroup
  submitted: boolean = false;
  categories: CategoryItemNode[];
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private projectService: ProjectService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getUsers();
  }

  private prepareForm() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      number: [null, Validators.required],
      description: '',
      contact: '',
      state: '',
      address: '',
      area: 0,
      startedAt: new Date(),
      finishedAt: new Date(),
      //attributes: this.formBuilder.array([])
    })
  }

  private getUsers() {
    return this.userService.all().subscribe(data => {
      this.users = data;
    });
  }

  submit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.projectService.store(this.formGroup.value).subscribe(() => {
      this.router.navigate(['/project']).then(() => {
        this.messageService.add("Zákazka bola vytvorena")
      })
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
