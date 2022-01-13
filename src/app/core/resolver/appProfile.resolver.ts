import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {AppProfileService} from '../services/app-profile.service';
import {AppProfile} from '../models/appProfile';
import {Injectable} from '@angular/core';

@Injectable()
export class AppProfileResolver implements Resolve<Observable<any>> {
  constructor(
    private userService: UserService,
    private appProfileService: AppProfileService) {}

  resolve(): Observable<AppProfile> {
    return this.appProfileService.defaultProfile();
  }
}
