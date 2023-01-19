import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {Role} from '../models/role';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPrivilegeGuardGuard implements CanActivate {
  privileges: string[] = [];

  constructor(
    private router: Router,
    protected readonly authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserRolePrivileges(route);
  }

  private fillRolePrivilege(roles: Role[]) {
    roles.forEach(role => {
      const rolePrivileges: string[] = role.privileges.map(p => p.name);

      this.privileges.push(...rolePrivileges);
    });
  }

  private checkUserRolePrivileges(route: ActivatedRouteSnapshot): boolean {
    this.fillRolePrivilege(JSON.parse(localStorage.getItem(this.authService.user.uid)));

    return this.privileges.includes(route.data.permissions);
  }
}
