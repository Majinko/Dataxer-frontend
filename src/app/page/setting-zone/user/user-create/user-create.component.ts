import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {RoleService} from '../../../../core/services/role.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../core/services/message.service';
import {Router} from '@angular/router';
import {COUNTRIES} from '../../../../core/data/countries';
import {Role} from '../../../../core/models/role';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup;
  salaryForm: FormGroup;
  role: Role[] = [];
  countries = COUNTRIES;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getRoles();
  }

  private prepareForm() {
    this.userForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      uid: null,
      phone: null,
      street: null,
      city: null,
      postalCode: null,
      country: null,
      roles: null
    });

    this.salaryForm = this.formBuilder.group({
      price: [0, Validators.required],
      salaryType: 'HOUR'
    });
  }

  private getRoles() {
    this.roleService.getAll().subscribe(r => {
      this.role = r;
    });
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    this.salaryForm.markAllAsTouched();

    if (this.userForm.invalid || this.salaryForm.invalid) {
      return;
    }

    this.userService.store({user: this.userForm.value, salary: this.salaryForm.value}).subscribe(() => {
      this.router.navigate(['/setting/user/all']).then(() => {
        this.messageService.add('Užívateľ bol vytvorený');
      });
    });
  }

  // convenience getter for easy access to form fields
  get fUser() {
    return this.userForm.controls;
  }

  // convenience getter for easy access to form fields
  get fSalary() {
    return this.salaryForm.controls;
  }
}
