import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/user';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {AppProfileService} from '../../../core/services/app-profile.service';
import {AppProfile} from '../../../core/models/appProfile';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  user: User;
  appProfiles: AppProfile[] = [];

  constructor(
    @Inject(UserService) public readonly userService: UserService,
    @Inject(AuthService) private readonly authService: AuthService,
    public readonly appProfileService: AppProfileService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getProfiles();
  }

  logout() {
    this.authService.signOut().then(() => this.router.navigate(['/auth/login']));
  }


  private getProfiles() {
    this.appProfileService.getAll().subscribe((profiles) => {
      this.appProfiles = profiles;
    });
  }

  switchCompany(profile: AppProfile) {
    this.userService.switchProfile(profile.id).subscribe(() => {
      window.location.reload();
    });
  }
}
