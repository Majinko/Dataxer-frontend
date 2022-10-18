import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {User} from '../../../core/models/user';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-new-user-select',
  templateUrl: './new-user-select.component.html',
  styleUrls: ['./new-user-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NewUserSelectComponent),
    multi: true
  }]
})
export class NewUserSelectComponent implements OnInit {
  user: User;

  @Input() users: User[] = [];
  @Input() placeholder: string;
  @Input() multiple?: boolean;

  constructor(
    private userService: UserService
  ) {
  }

  onTouched = () => {
  };
  onChange = _ => {
  };

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.all().subscribe(users => {
      this.users = users;
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(user: User) {
    this.user = user;
  }

  selectUser(user: User) {
    this.onChange(user);
  }
}
