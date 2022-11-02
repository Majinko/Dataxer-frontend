import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../core/models/user';
import {AuthService} from '../../../../core/services/auth.service';
import {COUNTRIES} from '../../../../core/data/countries';
import {UserService} from '../../../../core/services/user.service';
import {MessageService} from 'src/app/core/services/message.service';
import {ActivatedRoute} from '@angular/router';
import {RoleService} from '../../../../core/services/role.service';
import {Role} from '../../../../core/models/role';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  roles: Role[] = [];
  submitted: boolean = false;

  countries = COUNTRIES;
  formGroup: FormGroup;

  constructor(
    @Inject(UserService) public readonly userService: UserService,
    @Inject(AuthService) private readonly authService: AuthService,
    private messageService: MessageService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.prepareForm();
    this.getRoles();
  }

  private prepareForm() {
    this.formGroup = this.fb.group({
      id: null,
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [{value: null, disabled: true}, Validators.required],
      photoUrl: null,
      uid: null,
      phone: null,
      street: null,
      city: null,
      postalCode: null,
      country: null,
      roles: [null, Validators.required]
    });

    if (this.route.snapshot.paramMap.get('uid')) {
      this.getUserByUid();
    } else {
      this.user = this.userService.user;
      this.formGroup.patchValue(this.userService.user); // edit my account
    }
  }

  private getUserByUid() {
    this.userService.edit(this.route.snapshot.paramMap.get('uid')).subscribe(u => {

      this.user = u;
      this.formGroup.patchValue(u);
    });
  }

  private getRoles() {
    this.roleService.getAll().subscribe(r => {
      this.roles = r;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.userService.update(this.formGroup.value).subscribe(() => {
      this.messageService.add('Údaje boli aktualizované');
    });
  }

  storeUploadPhoto() {
    this.userService.update(this.formGroup.value).subscribe(() => {
      this.messageService.add('Fotka bola aktualizovaná');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
