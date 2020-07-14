import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../core/models/user';
import {AuthService} from '../../../../core/services/auth.service';
import {COUNTRIES} from '../../../../core/data/countries';
import {UserService} from '../../../../core/services/user.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  countries = COUNTRIES;
  formGroup: FormGroup;

  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(AuthService) private readonly authService: AuthService,
    private messageSevice: MessageService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      email: [null, Validators.required],
      phone: null,
      street: null,
      city: null,
      postalCode: null,
      country: null,
    });

    this.getLoggedUser();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  onSubmit(user: User) {
    if (this.formGroup.invalid) {
      return;
    }

    this.userService.update(this.user, user);
    this.messageSevice.add("Udaje boli aktualizovane");
  }

  getLoggedUser() {
    this.authService.loggedUser().subscribe(user => {
      this.user = user;

      this.formGroup.patchValue({
        name: this.user.displayName.split(' ')[0],
        surname: this.user.displayName.split(' ')[1],
        email: this.user.email,
        phone: this.user.phone,
        street: this.user.street,
        city: this.user.city,
        postalCode: this.user.postalCode,
        country: this.user.country,
      });
    });
  }
}
