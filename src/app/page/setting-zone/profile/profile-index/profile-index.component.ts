import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../core/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {ProfileService} from '../../../../core/services/profile.service';
import {ProfileDialogComponent} from '../profile-dialog/profile-dialog.component';
import {Profile} from '../../../../core/models/profile';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss']
})
export class ProfileIndexComponent implements OnInit {
  profiles: Profile[] = [];

  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();

    this.profileService.reloadRoles.subscribe(() => this.getAll());
  }

  getAll() {
    this.profileService.getAll().subscribe(profiles => {
      this.profiles = profiles;
    });
  }

  edit(profile: Profile) {
    this.dialog.open(ProfileDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      autoFocus: false,
      data: {
        profile
      }
    });
  }

  destroy(id: number) {
    this.profileService.destroy(id).subscribe(() => {
      this.profiles = this.profiles.filter(role => role.id !== id);

      this.messageService.add('Rola bola odstránená');
    });
  }

}
