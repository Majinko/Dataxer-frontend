import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../core/services/message.service';
import {MatDialog} from '@angular/material/dialog';
import {AppProfileService} from '../../../../core/services/app-profile.service';
import {ProfileDialogComponent} from '../profile-dialog/profile-dialog.component';
import {AppProfile} from '../../../../core/models/appProfile';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.scss']
})
export class ProfileIndexComponent implements OnInit {
  profiles: AppProfile[] = [];

  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    private profileService: AppProfileService,
    private dialog: MatDialog,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();

    this.profileService.reloadProfile.subscribe(() => this.getAll());
  }

  getAll() {
    this.profileService.getAll().subscribe(profiles => {
      this.profiles = profiles;
    });
  }

  edit(profile: AppProfile) {
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
      this.profiles = this.profiles.filter(profile => profile.id !== id);

      this.messageService.add('Rola bola odstránená');
    });
  }

}
