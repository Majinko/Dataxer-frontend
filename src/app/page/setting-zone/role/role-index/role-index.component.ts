import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../../../core/services/role.service';
import {Role} from '../../../../core/models/role';

@Component({
  selector: 'app-role-index',
  templateUrl: './role-index.component.html',
  styleUrls: ['./role-index.component.scss']
})
export class RoleIndexComponent implements OnInit {
  roles: Role[] = [];

  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private roleService: RoleService
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.roleService.getAll().subscribe(roles => {
      this.roles = roles;
    });
  }

  edit(role: Role) {

  }

  destroy(id: number) {

  }
}
