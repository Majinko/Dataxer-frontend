import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../core/services/message.service';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../core/models/user';
import {auth} from 'firebase';
import {Router} from '@angular/router';
import {LEGALFORMS} from '../../../core/data/legal-forms';
import {CompanyService} from '../../../core/services/company.service';
import {COUNTRIES} from '../../../core/data/countries';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLinear = false;
  countries = COUNTRIES;
  legalForms = LEGALFORMS;
  userFormGroup: FormGroup;
  companyFormGroup: FormGroup;

  constructor(
    @Inject(MessageService) private readonly messageService: MessageService,
    @Inject(CompanyService) private readonly companyService: CompanyService,
    @Inject(AuthService) private readonly authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [''],
      street: [''],
      city: [''],
      postalCode: [''],
      country: [''],
    });

    this.companyFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      legalForm: ['', Validators.required],
      street: [''],
      city: [''],
      postalCode: [''],
      country: [''],
      email: [''],
      phone: [''],
      web: [''],
    });
  }

  // convenience getter for easy access to form fields
  get fUser() {
    return this.userFormGroup.controls;
  }

  get fCompany() {
    return this.companyFormGroup.controls;
  }

  register() {
    if (this.userFormGroup.invalid || this.companyFormGroup.invalid) {
      return;
    }

    this.authService.registerWithEmail(this.fUser.email.value, this.fUser.password.value)
      .then((response: auth.UserCredential) => {
        this.authService.setUser = response.user;
        this.authService.user.displayName = this.fUser.firstName.value + ' ' + this.fUser.lastName.value;

        this.authService.updateUserData(this.authService.user).then(() => {
          this.companyService.store(this.companyFormGroup.value).subscribe();

          this.router.navigate(['auth/login']).then(() => {
            this.messageService.add('Registration successful');
          });
        });
      }).catch((error) => this.messageService.add(error));
  }
}
