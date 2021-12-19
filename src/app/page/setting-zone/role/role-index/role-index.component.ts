import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../../../core/services/role.service';
import {Privilege, Role} from '../../../../core/models/role';
import {PrivilegeService} from '../../../../core/services/privilege.service';
import {PRIVILEGEICONS} from '../../../../core/data/privilegesIcon';
import {MatDialog} from '@angular/material/dialog';
import {RoleDialogComponent} from '../role-dialog/role-dialog.component';
import {MessageService} from '../../../../core/services/message.service';

@Component({
  selector: 'app-role-index',
  templateUrl: './role-index.component.html',
  styleUrls: ['./role-index.component.scss']
})
export class RoleIndexComponent implements OnInit {
  roles: Role[] = [];
  privileges: Privilege[] = [];
  privilegesIcons = PRIVILEGEICONS;

  displayedColumns: string[] = ['name', 'privileges', 'actions'];

  constructor(
    private roleService: RoleService,
    private privilegeService: PrivilegeService,
    private dialog: MatDialog,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllPrivilege();

    this.roleService.reloadRoles.subscribe(() => this.getAll());
  }

  getAll() {
    this.roleService.getAll().subscribe(roles => {
      this.roles = roles.filter((r) => r.name !== 'ROLE_ADMIN');
    });
  }

  getAllPrivilege() {
    this.privilegeService.getAll().subscribe(privileges => {
      this.privileges = privileges;
    });
  }

  edit(role: Role) {
    this.dialog.open(RoleDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      autoFocus: false,
      data: {
        role
      }
    });
  }

  destroy(id: number) {
    this.roleService.destroy(id).subscribe(() => {
      this.roles = this.roles.filter(role => role.id !== id);

      this.messageService.add('Rola bola odstránená');
    });
  }

  getPrivilegeIcon(privilege: Privilege) {
    return this.privilegesIcons.find(pr => pr.name === privilege.name)?.icon;
  }

  roleIncludesPrivilege(role: Role, privilege: Privilege): boolean {
    return role.privileges.some(pr => pr.name === privilege.name);
  }
}
