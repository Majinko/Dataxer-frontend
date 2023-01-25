import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../core/models/user';
import {AuthService} from '../../../../core/services/auth.service';
import {COUNTRIES} from '../../../../core/data/countries';
import {UserService} from '../../../../core/services/user.service';
import {MessageService} from 'src/app/core/services/message.service';
import {ActivatedRoute} from '@angular/router';
import {RoleService} from '../../../../core/services/role.service';
import {Role} from '../../../../core/models/role';
import {CompanyService} from '../../../../core/services/company.service';
import {UserEditCompany} from '../../../../core/models/company';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  roles: Role[] = [];
  companies: UserEditCompany[] = [];
  submitted: boolean = false;

  countries = COUNTRIES;
  formGroup: FormGroup;

  constructor(
    @Inject(UserService) public readonly userService: UserService,
    @Inject(AuthService) private readonly authService: AuthService,
    private companyService: CompanyService,
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
      roles: [null, Validators.required],
      companies: this.fb.array([])
    });

    this.getUserByUid();
  }

  private getUserByUid() {
    this.userService.edit(this.route.snapshot.paramMap.get('uid') ?? this.userService.user.uid).subscribe(u => {

      this.user = u;
      this.formGroup.patchValue(u);

      this.getCompanies();
    });
  }

  private getRoles() {
    this.roleService.getAll().subscribe(r => {
      this.roles = r;
    });
  }

  private getCompanies() {
    this.companyService.allByAppProfileId().subscribe(companies => {
      this.companies = companies;

      this.companies.forEach(company => {
        company.isSelected = this.user.companies.some(userCompany => userCompany.id === company.id);
      });
    });
  }

  get companiesFormArray(): FormArray {
    return this.formGroup.get('companies') as FormArray;
  }

  private prepareCompanies() {
    this.companiesFormArray.reset();

    this.companies.forEach(company => {
      if (company.isSelected) {
        this.companiesFormArray.push(this.fb.group({
          id: company.id,
          name: company.name
        }));
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.prepareCompanies();


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
