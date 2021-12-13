import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {
  constructor(private userService: UserService) {}

  resolve(): Observable<User> {
    return this.userService.loggedUser();
  }
}
