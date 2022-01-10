import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUserProfileService} from '../services/app-user-profile.service';
import {AppProfile} from '../models/appProfile';
import {Injectable} from "@angular/core";

@Injectable()
export class AppUserProfileResolver implements Resolve<Observable<any>> {
  constructor(private appUserProfileService: AppUserProfileService) {
  }

  resolve(): Observable<AppProfile> {
    return this.appUserProfileService.defaultProfile();
  }
}
