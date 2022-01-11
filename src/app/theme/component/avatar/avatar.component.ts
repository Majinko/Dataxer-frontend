import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../core/models/user';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {AppProfileService} from '../../../core/services/app-profile.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  user: User;

  constructor(
    @Inject(UserService) public readonly userService: UserService,
    @Inject(AuthService) private readonly authService: AuthService,
    public readonly appProfileService: AppProfileService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut().then(() => this.router.navigate(['/auth/login']));
  }
}
