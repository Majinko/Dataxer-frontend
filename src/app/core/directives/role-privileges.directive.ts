import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {UserService} from '../services/user.service';

@Directive({
  selector: '[appRolePrivileges]'
})
export class RolePrivilegesDirective implements OnChanges {
  privileges: string[] = [];
  hasPrivilege: boolean = false;
  @Input() appRolePrivileges?: string | string[];

  constructor(
    private elRef: ElementRef,
    private userService: UserService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillPrivileges();
    this.validateAccess();
  }

  private validateAccess() {
    if (typeof this.appRolePrivileges === 'string') {
      this.hasPrivilege = this.privileges.includes(this.appRolePrivileges);
    } else {
      this.hasPrivilege = this.privileges.some(p => this.appRolePrivileges.includes(p));
    }

    if (!this.hasPrivilege) {
      this.elRef.nativeElement.remove();
    }
  }

  private fillPrivileges() {
    this.userService.user.roles.forEach(role => {
      const rolePrivileges: string[] = role.privileges.map(p => p.name);

      this.privileges.push(...rolePrivileges);
    });
  }
}
