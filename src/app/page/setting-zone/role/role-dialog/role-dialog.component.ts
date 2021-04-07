import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleService} from '../../../../core/services/role.service';
import {MessageService} from '../../../../core/services/message.service';
import {Privilege} from '../../../../core/models/role';
import {PrivilegeService} from '../../../../core/services/privilege.service';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {
  formGroup: FormGroup;
  privileges: Privilege[] = [];

  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private privilegeService: PrivilegeService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      privileges: null,
    });

    if (this.data && this.data.role) {
      this.formGroup.patchValue(this.data.role);
    }

    this.getAllPrivileges();
  }

  getAllPrivileges() {
    this.privilegeService.getAll().subscribe(privileges => {
      this.privileges = privileges;
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.roleService.storeOrUpdate(this.formGroup.value).subscribe(r => {
      this.dialogRef.close();
      this.roleService.reloadRoles.next(true);

      this.messageService.add(this.f.id === null ? 'Rola bola pridaná.' : 'Rola bola aktualizovaná');
    });
  }

  objectComparisonFunction(option, value): boolean {
    return option.id === value.id;
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }
}
